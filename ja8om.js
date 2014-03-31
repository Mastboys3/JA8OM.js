///////////////////////////////////////
//         JA8OM Cipher v2.0         //
// Copyright 2014 The Mastboys3 Team //
///////////////////////////////////////

function JA8OM(code) {
    charset("UTF-8");
    
    var text = code;
    
    var randomText = ["+", "-", "*", "/"];

    var lockText = ["*2", "/2", "*8", "*4", "/2", "*10", "*3", "/10", "+3", "*7", "/2", "*3", "+7", "*0.5", "/0.5", "/10"];

    var unlockText = ["/2", "*2", "/8", "/4", "*2", "/10", "/3", "*10", "-3", "/7", "*2", "/3", "-7", "/0.5", "*0.5", "*10"];
    
    function encode() {
        if (text.length != 1) {
            text = encipher_J(text);
        } else {
            text = encipher_J(text).split(")").join("");
        }
        
        return this;
    }
    
    function decode() {
        text = decipher_J(text);
        
        return this;
    }
    
    function val() {
        if (typeof arguments[0] == 'string' || arguments[0] instanceof String) {
            text = arguments[0];
            
            return this;
        }
        
        return text;
    }
    
    function setLock(locks) {
        lockText = [];
        unlockText = [];
        
        for (var m in locks) {
            if (m == "*" || m == "/" || m == "+" || m == "-") {
                if (Number(locks[m]).toString() != "NaN") {
                    if (locks[m].toString() != "0") {
                        if (m == "*") {
                            lockText.push(" * " + locks[m]);
                            unlockText.push(" / " + locks[m]);
                        } else if (m == "/") {
                            lockText.push(" / " + locks[m]);
                            unlockText.push(" * " + locks[m]);
                        } else if (m == "+") {
                            lockText.push(" + " + locks[m]);
                            unlockText.push(" - " + locks[m]);
                        } else if (m == "-") {
                            lockText.push(" - " + locks[m]);
                            unlockText.push(" + " + locks[m]);
                        }
                    } else {
                        console.error("TypeError: '" + locks[m] + " needs to be a number that is not 0");
                        
                        return;
                    }
                } else {
                    console.error("TypeError: '" + locks[m] + " needs to be a number or a number in a string");

                    return;
                }
            } else {
                console.error("TypeError: '" + m + "' doesn't work, it has to be: '*', '/', '+', or '-'");
                
                return;
            }
        }
        
        return this;
    }
    
    this.encode = encode;
    this.decode = decode;
    this.val = val;
    this.setLock = setLock;
    
    function encipher_J(text) {
        var chars = toChars(text.split(""));
        var finished = "";
        var backet = Math.floor((Math.random() * (chars.length - 1)) - 1);
        var backetUsed = false;

        for (var i = 0; i < chars.length; i++) {
            var sign = " " + randomText[Math.floor((Math.random() * 4))] + " ";

            if (i + 1 == chars.length) {
                sign = ")";
            } else if (backet < 0 && backetUsed == false) {
                finished = "(" + finished;
                backetUsed = true;
            } else {
                if (i == backet) {
                    sign += "(";
                }
            }

            finished += eval(chars[i] + getArrayLoop(lockText, i)) + sign;
        }

        return finished;
    }

    function decipher_J(text) {
        var textStr = text;
        
        // removes the "(", ")", and " " in textStr:
        textStr = textStr.split(")").join("");
        textStr = textStr.split("(").join("");
        textStr = textStr.split(" ").join("");

        // replaces "-", "+", "/", and "*" with ","
        textStr = textStr.split("-").join(",");
        textStr = textStr.split("+").join(",");
        textStr = textStr.split("/").join(",");
        textStr = textStr.split("*").join(",");

        textStr = textStr.replace(/[^0-9.,-]/g, "");
        
        if (textStr != "") {
            
            var lockedChars = textStr.split(",");
            var chars = [];
            var current = 0;

            for (var i = 0; i < lockedChars.length; i++) {
                chars.push(eval(lockedChars[i] + getArrayLoop(unlockText, i)));
            }
            
            return fromChars(chars);
        }
        
        return "";
    }

    function getArrayLoop(arr, e) {
        for (var i = e; i + 1 > arr.length; i) {
            i -= arr.length;
            e = i;
        }

        return arr[e];
    }
}

script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.setAttribute("src", "http://www.dfyanimation.com/scripts/charmanager.min.js");
document.getElementsByTagName("HEAD")[0].appendChild(script);
