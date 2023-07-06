AFRAME.registerComponent("paintball", {
    init: function () {
      this.shootPaintball();
    },
    shootPaintball: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "z") {
          var paintball = document.createElement("a-entity");
  
          paintball.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.1,
          });
  
          paintball.setAttribute("material", "color", "black");
  
          var cam = document.querySelector("#camera-rig");
          pos = cam.getAttribute("position");
  
          paintball.setAttribute("position", {
            x: pos.x,
            y: pos.y + 1,
            z: pos.z - 0.5,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          paintball.setAttribute("velocity", direction.multiplyScalar(-50));
  
          var scene = document.querySelector("#scene");
  
          paintball.setAttribute("dynamic-body", {
            shape: "sphere",
            mass: "50",
          });
  
          paintball.addEventListener("collide", this.removePaintball);
  
          scene.appendChild(paintball);
  
          this.shootSound();
        }
      });
    },
    removePaintball: function (e) {
      var scene = document.querySelector("#scene");
            var element = e.detail.target.el;
        var elementHit = e.detail.body.el;
  
      if (elementHit.id.includes("enemy")) {
      
        scene.removeChild(elementHit);
      }
      element.removeEventListener("collide", this.removePaintball);
  
      scene.removeChild(element);
    },
    shootSound: function () {
      var entity = document.querySelector("#sound1");
      entity.components.sound.playSound();
    },
  });
  
  