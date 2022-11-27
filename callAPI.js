  // const IconService = window['icon-sdk-js'].default;
    // const httpProvider = new IconService.HttpProvider('https://sejong.net.solidwallet.io/api/v3')
    // const iconService = new IconService(httpProvider);
    var myAddress;
    var nameUser;
    var avatar;
    function showAll(){
        console.log(myAddress);
        console.log(nameUser);
        console.log(avatar);    
    }
    //connect wallet
    var contractAddress = "cx7f920f344cc41bc6d3e957c01845a794e61e721d";
    function connectWallet() {
        const connectWalletEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
            detail: {
                type: 'REQUEST_ADDRESS'
            }
        });
        window.dispatchEvent(connectWalletEvent);

        const eventHandlerConnectWallet = event => {
            const { type, payload } = event.detail;
            if (type === 'RESPONSE_ADDRESS') {
                myAddress = payload;
                getName.call();
            }
            getAvatar();
        }
        window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandlerConnectWallet);
    }

    //icx_sendTransaction

     function setName() {
         const setNameEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
                detail: {
                    type: 'REQUEST_JSON-RPC',
                    payload: {
                        jsonrpc: "2.0",
                        method: "icx_sendTransaction",
                        id: 6339,
                        params: {
                            nid: "0x53",
                            timestamp: `0x${((new Date().getTime() * 1000).toString(16))}`,
                            version: "0x3",
                            from: myAddress, // TX sender address
                            stepLimit: "2500000000",
                            to: contractAddress,   // SCORE address
                            dataType: "call",
                            data: {
                                method: "setName", // SCORE external function
                                params: { _user: myAddress, _name :  document.getElementById('name').value}
                            }
                        }
                    }
                }
            });
            window.dispatchEvent(setNameEvent);
            const eventHandler = event => {
            window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
        
            const { type, payload } = event.detail;
            if (type === 'RESPONSE_JSON-RPC') {
                //  
            }
            else if (type === 'CANCEL_JSON-RPC') {
                console.error('User cancelled JSON-RPC request');
            }
        }
        window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
        
        }

            function setAvatar() {
            const setAvatarEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
                detail: {
                    type: 'REQUEST_JSON-RPC',
                    payload: {
                        jsonrpc: "2.0",
                        method: "icx_sendTransaction",
                        id: 6339,
                        params: {
                            nid: "0x53",
                            timestamp: `0x${((new Date().getTime() * 1000).toString(16))}`,
                            version: "0x3",
                            from: myAddress, // TX sender address
                            // value: "0xde0b6b3a7640000",
                            stepLimit: "2500000000",
                            to: contractAddress,   // SCORE address
                            dataType: "call",
                            data: {
                                method: "setAvatar", // SCORE external function
                                params: { _user: myAddress, _img :  document.getElementById('avatar').value}
                            }
                        }
                    }
                }
            });
            window.dispatchEvent(setAvatarEvent); 
            const eventHandler = event => {
            window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
        
            const { type, payload } = event.detail;
            if (type === 'RESPONSE_JSON-RPC') {
                //  
            }
            else if (type === 'CANCEL_JSON-RPC') {
                console.error('User cancelled JSON-RPC request');
            }
        }
        window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
        }

        //icxcall

        function getName() {
            const getNameEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
                detail: {
                    type: 'REQUEST_JSON-RPC',
                    payload: {
                        jsonrpc: "2.0",
                        method: "icx_call",
                        id: 6339,
                        params: {
                            from: myAddress, // TX sender address
                            to: contractAddress,   // SCORE address
                            dataType: "call",
                            data: {
                                method: "getName", // SCORE external function
                                params: { _user: myAddress}
                            }
                        }
                    }
                }
            });
            window.dispatchEvent(getNameEvent); 
            const eventHandler = event => {
            window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
        
            const { type, payload } = event.detail;
            if (type === 'RESPONSE_JSON-RPC') {
                nameUser =payload.result; 
            }
            else if (type === 'CANCEL_JSON-RPC') {
                console.error('User cancelled JSON-RPC request');
                }
            }
            window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
        }

        

        function getAvatar() {
            const getAvatarEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
                detail: {
                    type: 'REQUEST_JSON-RPC',
                    payload: {
                        jsonrpc: "2.0",
                        method: "icx_call",
                        id: 6339,
                        params: {
                            from: myAddress, // TX sender address
                            to: contractAddress,   // SCORE address
                            dataType: "call",
                            data: {
                                method: "getAvatar", // SCORE external function
                                params: { _user: myAddress}
                            }
                        }
                    }
                }
            });
            window.dispatchEvent(getAvatarEvent); 
            const eventHandler = event => {
            window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
            const { type, payload } = event.detail;
                if (type === 'RESPONSE_JSON-RPC') {
                    avatar = payload.result;
                }
                else if (type === 'CANCEL_JSON-RPC') {
                    console.error('User cancelled JSON-RPC request')
                }
            }
            window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
    }

//function
    function getInfo(){
        getName();
        getAvatar();
    }

