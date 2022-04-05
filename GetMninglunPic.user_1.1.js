// ==UserScript==
// @name         GetMninglunPic
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  try to take over the world!
// @author       You
// @match        https://test.test.test/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=topschool.tw
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.1.0/jszip-utils.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.js
// ==/UserScript==

(function() {
    'use strict';

    var zipFilename = "allimage.zip"
    var zip = new JSZip();
    var x = document.getElementsByTagName("a")
    var urllist=[]
    var c=0
    // Save all image url into urllist
    for(var i=0; i<x.length; i++){
        if(x[i].href.indexOf("jpg")>0){
            console.log(x[i].href)
            urllist.push(x[i].href)
            c++
        }
    }

    // Get album name
    var y = document.getElementsByTagName("h2")
    zipFilename = y[0].innerHTML+".zip"
    console.log(zipFilename)

    // Get Image Content Ready
    function urlToPromise(url){
        return new Promise(function(resolve, reject) {
            JSZipUtils.getBinaryContent(url, function (err, data) {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
    console.log(c)
    console.log(urllist)
    var urls = urllist
    //var start=urllist[0].indexOf("Id")+2
    //var end=urllist[0].length
    //console.log(urllist[0].substring(start, end))

    // Add all image file into zipfile
    urls.forEach(function(url, index){
        var filename = url.substring(url.indexOf("Id")+2,url.length)
        //var filename = index + ".jpg";
        zip.file(filename, urlToPromise(url), {binary:true});
    });

    // Save file to local storage
    console.log('downloading...')
    zip.generateAsync({type:'blob'}).then(function(content) {
        saveAs(content, zipFilename);
    });
})();
