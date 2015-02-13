(function (window) {
  "use strict";

  var storage = document.querySelector("rise-storage"),
    singleImage = "https://url.to.home.jpg",
    images = {
      "items": [
        {
          "name": "my-folder/home.jpg",
          "contentType": "image/jpeg",
          "updated": "2015-02-04T17:45:25.945Z",
          "mediaLink": "https://url.to.home.jpg"
        },
        {
          "name": "my-folder/circle.png",
          "contentType": "image/png",
          "updated": "2015-02-06T14:25:11.312Z",
          "mediaLink": "https://url.to.circle.png"
        },
        {
          "name": "my-folder/my-image.bmp",
          "contentType": "image/bmp",
          "updated": "2015-02-06T11:24:13.313Z",
          "mediaLink": "https://url.to.my-image.bmp"
        }
      ]
    },
    videos = {
     "items": [
       {
          "name": "my-folder/car-ad.mp4",
          "contentType": "video/mp4",
          "updated": "2015-02-02T10:03:11.263Z",
          "mediaLink": "https://url.to.car-ad.mp4"
        },
        {
          "name": "my-folder/walking-dead.ogv",
          "contentType": "video/ogg",
          "updated": "2015-02-01T09:08:15.263Z",
          "mediaLink": "https://url.to.walking-dead.ogv"
        },
        {
          "name": "my-folder/south-park.webm",
          "contentType": "video/webm",
          "updated": "2015-02-03T19:13:45.263Z",
          "mediaLink": "https://url.to.south-park.webm"
        }
      ]
    };

  function handleStorageResponse() {
    var companyId = storage.getAttribute("companyId"),
      folder = storage.getAttribute("folder"),
      fileName = storage.getAttribute("fileName"),
      fileType = storage.getAttribute("fileType"),
      contentType = storage.getAttribute("contentType"),
      sort = storage.getAttribute("sort"),
      sortDirection = storage.getAttribute("sortDirection"),
      contentTypes = null,
      files = [],
      urls = [];

    if (companyId) {
      if (folder) {
        // Single file in folder.
        if (fileName) {
          return singleImage;
        }
      }
      // Single file in bucket.
      else if (fileName) {
        return singleImage;
      }

      // File type filtering
      if (fileType) {
        if (fileType === "image") {
          images.items.forEach(function(image) {
            files.push(image);
          });
        }
        else if (fileType === "video") {
          videos.items.forEach(function(video) {
            files.push(video);
          });
        }
      }
      // Content type filtering
      else if (contentType) {
        contentTypes = contentType.split(" ");

        images.items.forEach(function(image) {
          for (var i = 0; i < contentTypes.length; i++) {
            if (image.contentType === contentTypes[i]) {
              files.push(image);
              break;
            }
          }
        });

        videos.items.forEach(function(video) {
          for (var i = 0; i < contentTypes.length; i++) {
            if (video.contentType === contentTypes[i]) {
              files.push(video);
              break;
            }
          }
        });
      }
      // Multiple files in folder or bucket.
      else {
        images.items.forEach(function(image) {
          files.push(image);
        });
      }

      // Sorting
      if (sort) {
        if (sort === "name") {
          files.sort(function(a, b) {
            if (a.name > b.name) {
              return 1;
            }
            else if (a.name < b.name) {
              return -1;
            }

            return 0;
          });
        }
        else if (sort === "date") {
          files.sort(function(a, b) {
            a.updated = new Date(a.updated).getTime();
            b.updated = new Date(b.updated).getTime();

            if (a.updated > b.updated) {
              return 1;
            }
            else if (a.updated < b.updated) {
              return -1;
            }

            return 0;
          });
        }
      }

      if (sortDirection && sortDirection === "desc") {
        files.reverse();
      }

      files.forEach(function(file) {
        urls.push(file.mediaLink);
      });

      return urls;
    }
  }

  HTMLElement.prototype.go = function() {
    var evt = document.createEvent("CustomEvent"),
      urls = handleStorageResponse();

    evt.initCustomEvent("rise-storage-response", false, false, urls);
    storage.dispatchEvent(evt);
  }
})(window);