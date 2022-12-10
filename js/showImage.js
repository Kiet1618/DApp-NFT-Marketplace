var imageList = [
  
    {
      src: "${img.src}",
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