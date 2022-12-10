// import { NFTStorage } from 'nft.storage'
// import { NFTStorage, File, Blob } from 'nft.storage'
// const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQyMmZhREJkNjQ4MWFlZTBFMDlBMjVFNjNjYUFmRDhhMTI0Yjk0OTIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MDA2NTY2NzU2MywibmFtZSI6Imtob2Fob2FuZzUxMSJ9._L2m9_qhmLASwu10PMqAZxMaXP3ZJll-FV7Q_BqOYv0'
// const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

const IconService = window["icon-sdk-js"].default;
const httpProvider = new IconService.HttpProvider(
  "https://sejong.net.solidwallet.io/api/v3"
);
const iconService = new IconService(httpProvider);

const { IconBuilder } = IconService
    const { CallBuilder } = IconBuilder
//NOTE cho nhom lam WEB front-end
var myAddress=""; //Địa chỉ ví của user
var adminAddress = "hx92d7c1f36674f5c5f93aab101b508daaa621b22d"; // Địa chỉ ví của tao
var nameUser; // Tên User (String)

var avatar; // Ảnh đại diện (String)
var allPublicNFTs; // Tất cả ảnh NFT public (kiểu mảng chuôi ["anh1.png", "anh2.png"] )
const listItems = [];
const marketplace = document.querySelector("#content1");
// const collectionNFT = document.querySelector("#item1");
async function call(){
  allPublicNFTs = await getPublicNFTs();
  console.log(allPublicNFTs);

  allPublicNFTs.map(async (publicNFT) => {
    const img = document.createElement("img");
    img.src = publicNFT;
    // var a = await getNFTInfo(publicNFT);
    // console.log(a);
    // console.log(img);
    // var a = nftInfo(publicNFT);
    // console.log(a);
    const div = document.createElement("div");
    div.setAttribute("class", "marketplace-card");
    listItems.push(div);
    div.innerHTML = `
        <img class="marketplace-card__img" src= "${img.src}" >
        <div class="marketplace-card__title">
        <div class="marketplace-card__title-info">
          <p class="marketplace-card__title-name">"${nameUser}"</p>
          <p class="marketplace-card__title-author">
            Created by <a href="#">Rick</a>
          </p>
        </div>
        <a class="marketplace-card__title-author-link" href="#">
          <img
            class="marketplace-card__title-autorimg"
            src="source/img/seller_ava1.png"
            alt="Rick"
          />
        </a>
      </div>
      <ul class="marketplace-card__info">
        <li class="marketplace-info__item">
          <p class="marketplace-info__item-title">Current Bid</p>
          <p class="marketplace-info__item-data">1.90 ETH</p>
        </li>
        <li class="marketplace-info__item">
          <p class="marketplace-info__item-title">Ending In</p>
          <p class="product__text">
            <a class="button js-add-product" href="#" title="Add to cart">
              Add to cart
            </a>
          </p>
          
          <div
            class="marketplace-info__item-data seller-card__counter"
          >
            <div class="counter__hours counter__item">
              <h3>18</h3>
              <span>Hours</span>
            </div>

            <div class="counter__mins counter__item">
              <h3>25</h3>
              <span>Mins</span>
            </div>

            <div class="counter__secs counter__item">
              <h3>44</h3>
              <span>Secs</span>
            </div>
          </div>
        </li>
      </ul>
        `;
    marketplace.appendChild(div);
    console.log(marketplace);
  });

  
  
  

}
const getNFTInfo = async (_nft) => {
  const call = new CallBuilder()
      .to(process.env.REACT_APP_SCORE_ADDRESS)
      .method('getNFTInfo')
      .params({
          _nft: _nft,
          _timestamp: IconService.IconConverter.toBigNumber(Date.now() * 1000)
      })
      .build()

  const nftInfo = await iconService.call(call).execute()
  return nftInfo;
}

function showAll() {
  // getPublicNFTs();

  
   
}

//connect wallet

var contractAddress = "cx7f920f344cc41bc6d3e957c01845a794e61e721d";
function connectWallet() {
  const connectWalletEvent = new CustomEvent("ICONEX_RELAY_REQUEST", {
    detail: {
      type: "REQUEST_ADDRESS",
    },
  });
  window.dispatchEvent(connectWalletEvent);

  const eventHandler = (event) => {
    const { type, payload } = event.detail;
    if (type === "RESPONSE_ADDRESS") {
      myAddress = payload;
      // getName();
      swapIcon() ;
    }
  };
  window.addEventListener("ICONEX_RELAY_RESPONSE", eventHandler);
}

//icx_sendTransaction

function setName() {
  const setNameEvent = new CustomEvent("ICONEX_RELAY_REQUEST", {
    detail: {
      type: "REQUEST_JSON-RPC",
      payload: {
        jsonrpc: "2.0",
        method: "icx_sendTransaction",
        id: 6339,
        params: {
          nid: "0x53",
          timestamp: `0x${(new Date().getTime() * 1000).toString(16)}`,
          version: "0x3",
          from: myAddress, // TX sender address
          stepLimit: "2500000000",
          to: contractAddress, // SCORE address
          dataType: "call",
          data: {
            method: "setName", // SCORE external function
            params: {
              _user: myAddress,
              _name: document.getElementById("name").value,
            },
          },
        },
      },
    },
  });
  window.dispatchEvent(setNameEvent);
  const eventHandler = (event) => {
    window.removeEventListener("ICONEX_RELAY_RESPONSE", eventHandler);

    const { type, payload } = event.detail;
    if (type === "RESPONSE_JSON-RPC") {
      //
    } else if (type === "CANCEL_JSON-RPC") {
      console.error("User cancelled JSON-RPC request");
    }
  };
  window.addEventListener("ICONEX_RELAY_RESPONSE", eventHandler);
}

function setAvatar() {
  const setAvatarEvent = new CustomEvent("ICONEX_RELAY_REQUEST", {
    detail: {
      type: "REQUEST_JSON-RPC",
      payload: {
        jsonrpc: "2.0",
        method: "icx_sendTransaction",
        id: 6339,
        params: {
          nid: "0x53",
          timestamp: `0x${(new Date().getTime() * 1000).toString(16)}`,
          version: "0x3",
          from: myAddress, // TX sender address
          // value: "0xde0b6b3a7640000",
          stepLimit: "2500000000",
          to: contractAddress, // SCORE address
          dataType: "call",
          data: {
            method: "setAvatar", // SCORE external function
            params: {
              _user: myAddress,
              _img: document.getElementById("avatar").value,
            },
          },
        },
      },
    },
  });
  window.dispatchEvent(setAvatarEvent);
  const eventHandler = (event) => {
    window.removeEventListener("ICONEX_RELAY_RESPONSE", eventHandler);

    const { type, payload } = event.detail;
    if (type === "RESPONSE_JSON-RPC") {
      //
    } else if (type === "CANCEL_JSON-RPC") {
      console.error("User cancelled JSON-RPC request");
    }
  };
  window.addEventListener("ICONEX_RELAY_RESPONSE", eventHandler);
}

//icxcall

function getName() {
  const getNameEvent = new CustomEvent("ICONEX_RELAY_REQUEST", {
    detail: {
      type: "REQUEST_JSON-RPC",
      payload: {
        jsonrpc: "2.0",
        method: "icx_call",
        id: 6339,
        params: {
          from: myAddress, // TX sender address
          to: contractAddress, // SCORE address
          dataType: "call",
          data: {
            method: "getName", // SCORE external function
            params: { _user: myAddress },
          },
        },
      },
    },
  });
  window.dispatchEvent(getNameEvent);
  const eventHandler = (event) => {
    window.removeEventListener("ICONEX_RELAY_RESPONSE", eventHandler);

    const { type, payload } = event.detail;
    if (type === "RESPONSE_JSON-RPC") {
      nameUser = payload.result;
    } else if (type === "CANCEL_JSON-RPC") {
      console.error("User cancelled JSON-RPC request");
    }
  };
  window.addEventListener("ICONEX_RELAY_RESPONSE", eventHandler);
}

function getAvatar() {
  const getAvatarEvent = new CustomEvent("ICONEX_RELAY_REQUEST", {
    detail: {
      type: "REQUEST_JSON-RPC",
      payload: {
        jsonrpc: "2.0",
        method: "icx_call",
        id: 6339,
        params: {
          from: myAddress, // TX sender address
          to: contractAddress, // SCORE address
          dataType: "call",
          data: {
            method: "getAvatar", // SCORE external function
            params: { _user: myAddress },
          },
        },
      },
    },
  });
  window.dispatchEvent(getAvatarEvent);
  const eventHandler = (event) => {
    window.removeEventListener("ICONEX_RELAY_RESPONSE", eventHandler);
    const { type, payload } = event.detail;
    if (type === "RESPONSE_JSON-RPC") {
      avatar = payload.result;
    } else if (type === "CANCEL_JSON-RPC") {
      console.error("User cancelled JSON-RPC request");
    }
  };
  window.addEventListener("ICONEX_RELAY_RESPONSE", eventHandler);
}

// function getPublicNFTs() {
//   const getNFTsEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
//       detail: {
//           type: 'REQUEST_JSON-RPC',
//           payload: {
//               jsonrpc: "2.0",
//               method: "icx_call",
//               id: 6329,
//               params: {
//                   from: adminAddress, // TX sender address
//                   to: contractAddress,   // SCORE address
//                   dataType: "call",
//                   data: {
//                       method: "getPublicNFTs", // SCORE external function
//                       params: {}
//                   }
//               }
//           }
//       }
//   });
//   window.dispatchEvent(getNFTsEvent);
//   const eventHandler = async event => {
//       window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
//       const { type, payload } = event.detail;
//       if (type === 'RESPONSE_JSON-RPC') {
//           console.log(payload);
//           allPublicNFTs = payload.result;
//           showAll();
//           }
//       else if (type === 'CANCEL_JSON-RPC') {
//           console.error('User cancelled JSON-RPC request');
//       }
//   }
//   window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
// }

const getPublicNFTs = async () => {
  const call = new CallBuilder()
      .to(contractAddress)
      .method('getPublicNFTs')
      .params({})
      .build()

  const nfts = await iconService.call(call).execute()
  return nfts;
}


function openContent(evt, contents) {
  var i, marketplaceContent, marketplaceTab;
  marketplaceContent = document.getElementsByClassName("marketplace__content");
  console.log(marketplaceContent);

  for (i = 0; i < marketplaceContent.length; i++) {
    console.log(marketplaceContent[i]);
    marketplaceContent[i].style.display = "none";
  }
  marketplaceTab = document.getElementsByClassName("marketplace__tab");
  for (i = 0; i < marketplaceTab.length; i++) {
    marketplaceTab[i].className = marketplaceTab[i].className.replace(
      " active",
      ""
    );
  }
  document.getElementById(contents).style.display = "grid";
  evt.currentTarget.className += " active";
}

var imageList = [
  
  {
    src: "source/img/nft_1.avif",
  },
  {
    src: "source/img/nft_2.avif",
  },
  {
    src: "source/img/nft_3.avif",
  },
  {
    src: "source/img/nft_4.avif",
  },
  {
    src: "source/img/nft_4.avif",
  },
  {
    src: "source/img/nft_4.avif",
  },
  {
    src: "source/img/nft_4.avif",
  },
  {
    src: "source/img/nft_4.avif",
  },
  {
    src: "source/img/nft_4.avif",
  },
  {
    src: "source/img/nft_4.avif",
  },
  {
    src: "source/img/nft_4.avif",
  },
];
function showImage(imageList) {
  const collectionList = document.querySelectorAll(".collection_list");
  collectionList.forEach((collection) => {
    console.log(collection);
    imageList.map((image) => {
      const img = document.createElement("img");
      img.src = image.src;
      collection.appendChild(img);
      console.log(img.src);
    });
  });
}
showImage(imageList);




// function showImage(allPublicNFTs) {
//   const collectionList = document.querySelectorAll(".collection_list");
//   collectionList.forEach((collection) => {
//     console.log(collection);
//     allPublicNFTs.map((publicNFT) => {
//       const img = document.createElement("img");
//       img.src = publicNFT;
//       console.log(img.src);
//       const div = document.createElement("div");
//       div.setAttribute("class", "collection_list");
//       listItems.push(div);
//       div.innerHTML=`
//       <div class="collection_list"></div>
      
//       `;
//       collectionNFT.appendChild(div);
//       console.log(collectionNFT);

//     })
//   })
// }
// showImage(allPublicNFTs);

const swiperCardFlex = new Swiper('.card-flex', {
  breakpoints: {
      992: {
          slidesPerView: 3,
      },
      576: {
          slidesPerView: 2.1,
      },
      0: {
          slidesPerView: 1.1,
      }
  },

  navigation: {
      nextEl: '.card__explore'
  }
});

const swiperUserFlex = new Swiper('.users__card-flex', {
  breakpoints: {
      992: {
          slidesPerView: 3,
      },
      576: {
          slidesPerView: 2.1,
      },
      0: {
          slidesPerView: 1.1,
      }
  },

  navigation: {
      nextEl: '.user__explore'
  }
});

const swiperSellers = new Swiper('.top-sellers__swiper', {
  breakpoints: {
      992: {
          slidesPerView: 3,
      },
      768: {
          slidesPerView: 2,
      },
      0: {
          slidesPerView: 1,
      }
  },

  navigation: {
      nextEl: '.top-sellers__explore'
  }
});

let checkbox = document.getElementById('menu-toggle')

checkbox.onclick = () => {
  if (checkbox.checked) {
      document.body.style.overflow = 'hidden';
  } else{
      document.body.style.overflow = 'visible';
  }
}

function footerOpen(count) {
  switch(count){
      case 1:
          if(document.querySelector('.market-place').classList[2]){
              document.querySelector('.market-place').classList.remove('open')
          } else{
              document.querySelector('.market-place').classList.add('open')
          }
          break
      case 2:
          if(document.querySelector('.collectibles').classList[2]){
              document.querySelector('.collectibles').classList.remove('open')
          } else{
              document.querySelector('.collectibles').classList.add('open')
          }
          break
      case 3:
          if(document.querySelector('.support').classList[2]){
              document.querySelector('.support').classList.remove('open')
          } else{
              document.querySelector('.support').classList.add('open')
          }
          break
      case 4:
          if(document.querySelector('.legal').classList[2]){
              document.querySelector('.legal').classList.remove('open')
          } else{
              document.querySelector('.legal').classList.add('open')
          }
          break
      case 5:
          if(document.querySelector('.follow').classList[2]){
              document.querySelector('.follow').classList.remove('open')
          } else{
              document.querySelector('.follow').classList.add('open')
          }
          break
  }

}

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 0) {document.querySelector('header').classList.add('scrolled')}
  else {document.querySelector('header').classList.remove('scrolled')}
});

setInterval(() => counters(), 1000);

function counters(){
  let hour
  let minutes
  let second

  let countersArr = document.querySelectorAll('.seller-card__counter')

  for (let counter of countersArr) {
      second = counter.children[2].firstElementChild.innerHTML
      minutes = counter.children[1].firstElementChild.innerHTML
      hour = counter.children[0].firstElementChild.innerHTML

      if (second - 1 >= 0) {
          counter.children[2].firstElementChild.innerHTML = second - 1
      } else if (minutes - 1 >= 0) {
          counter.children[2].firstElementChild.innerHTML = 60
          counter.children[1].firstElementChild.innerHTML = minutes - 1
      } else {
          counter.children[2].firstElementChild.innerHTML = 60
          counter.children[1].firstElementChild.innerHTML = 60
          counter.children[0].firstElementChild.innerHTML = hours - 1
      }
  }
}

function collectionBrandActive() {
  document.querySelector('.grid__brand').classList.add('active')
  document.querySelector('.grid__art').classList.remove('active')

  document.querySelector('.collection__brand').classList.add('active')
  document.querySelector('.collection__art').classList.remove('active')
}

function collectionArtActive() {
  document.querySelector('.grid__art').classList.add('active')
  document.querySelector('.grid__brand').classList.remove('active')

  document.querySelector('.collection__art').classList.add('active')
  document.querySelector('.collection__brand').classList.remove('active')
}

function ButtonActive(buttonNum) {
  let gridButton = document.querySelector('.collection__grid')

  for (let i = 0; i < 8; i++) {
      if (gridButton.children[i].firstElementChild.classList[2] = 'active') {
          gridButton.children[i].firstElementChild.classList.remove('active')
          document.querySelector('.collection__img').children[i].classList.remove('active')
      }
  }

  gridButton.children[buttonNum].firstElementChild.classList.add('active')
  document.querySelector('.collection__img').children[buttonNum].classList.add('active')

  document.querySelector('collection__img')
}

const imgs = document.getElementById("imgs");
const img = document.querySelectorAll("#imgs img");

let idx = 0;

let interval = setInterval(run, 2000);

function run() {
idx++;
changeImage();
}

function changeImage() {
if (idx > img.length - 1) {
 idx = 0;
} else if (idx < 0) {
 idx = img.length - 1;
}

imgs.style.transform = `translateX(${-idx * 480}px)`;
}

function resetInterval() {
clearInterval(interval);
interval = setInterval(run, 2000);
}

const inputImg = document.querySelector('#input-img')

inputImg.addEventListener('change', (e) => {
 let file = e.target.files[0]

 if (!file) return

 let img = document.createElement('img')
 img.src = URL.createObjectURL(file)

 document.querySelector('.preview').appendChild(img)
})
const inputAvatar = document.querySelector('#input-avatar')

inputAvatar.addEventListener('change', (e) => {
 let file = e.target.files[0]

 if (!file) return

 let img = document.createElement('img')
 img.src = URL.createObjectURL(file)

 document.querySelector('.preview1').appendChild(img)
})

// const carts = document.querySelector("#cart_id");
// async function showAll(){
//   allPublicNFTs = await getPublicNFTs();
//   console.log(allPublicNFTs);

//   allPublicNFTs.map(async (nft) => {
//     const img = document.createElement("img");
//     img.src = nft;
//     const div = document.createElement("div");
//     div.setAttribute("class", "nft_buy");
//     listItems.push(div);
//     div.innerHTML = `
     
//       <img class="nft_buy" src= "${img.src}" >
     
//   </div> 
//         `;
//     carts.appendChild(div);
//     console.log(carts);
//   });
// }

// async function showNFTs(){
//   allPublicNFTs = await getPublicNFTs();
//   const products = document.querySelectorAll(".item1");
//   products.forEach(async (product) => {
//     console.log(product);
//     allPublicNFTs.map((nft) => {
//       const img = document.createElement("img");
//       img.src = nft.src;
//       product.appendChild(img);
//       console.log(img.src)

//     });
//   });
// }
// showNFTs(allPublicNFTs);


// function showImage(imageList) {
//   const collectionList = document.querySelectorAll(".collection_list");
//   collectionList.forEach((collection) => {
//     console.log(collection);
//     imageList.map((image) => {
//       const img = document.createElement("img");
//       img.src = image.src;
//       collection.appendChild(img);
//       console.log(img.src);
//     });
//   });
// }

// allPublicNFTs.map(async (publicNFT) => {
//   const img = document.createElement("img");
//   img.src = publicNFT;
//   // var a = await getNFTInfo(publicNFT);
//   // console.log(a);
//   // console.log(img);
//   const div = document.createElement("div");

function profile(){
  document.getElementById("main__page").style.display="none";
  document.getElementById("profile__page").style.display="block";
  

}
function nftPage(){
  document.getElementById("main__page").style.display="none";
  document.getElementById("profile__page").style.display="none";
  document.getElementById("nft__page").style.display="block";

}
function mainPage(){
  document.getElementById("main__page").style.display="block";

}
function swapIcon() {
  document.getElementById("connect__walletButton").style.display="none";
  document.getElementById("profile__icon").style.display="block";
  document.getElementById("cart__button").style.display="block";


}