import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';

//load 3d object
//axios로 가져오기
//const rendering3dObject = (currentObject) => {
  const ThreeDCubeRender = () => {
    const viewer = useRef();

    useEffect(() => {
      //3dObject========================================

      //init
      const WIDTH = window.innerWidth;
      const HEIGHT = window.innerHeight;
    
      //rendering init
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(WIDTH, HEIGHT);
      viewer.current.appendChild( renderer.domElement );
    
      //scene init
      const scene = new THREE.Scene();
      // scene.background = new THREE.Color(0xd7d7d7);
    
      //camera init
      const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 10000);
      // camera.position.x = cameraPosition[0];
      // camera.position.y = cameraPosition[1];
      // camera.position.z = cameraPosition[2];
      camera.position.z = 5;

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube = new THREE.Mesh( geometry, material );
      scene.add( cube );

      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
        //controls.update();
      };
      animate();

    }, []);
   
      return(
          <div><div ref={viewer} /></div>
      );
    };

  export default ThreeDCubeRender