import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

//load 3d object
//axios로 가져오기
  const ThreeDCubeRender = ({ threeDObject }) => {

    const viewer = useRef();
    
    useEffect(() => {
        objectLoade(threeDObject);
    }, [threeDObject]);

    const objectLoade = (currentObject) => {
        //3dObject========================================
        const objectFilePath = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/asset/models/' + currentObject.objectFile.id + "/";
        const objFileName = currentObject.objectFile.obj;
        const mtlFileName = currentObject.objectFile.mtl;

        //camera의 위치
        const cameraPosition = [-30, 40, 50];
        //object가 바라보는 방향
        const objectRotationXYZ = [0, 0, 0];
        //init
        const WIDTH = window.innerWidth;
        const HEIGHT = window.innerHeight;
        
        //rendering init
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            logarithmicDepthBuffer: true,
            alpha: true,
        });
        renderer.setSize(WIDTH, HEIGHT);
        viewer.current.appendChild( renderer.domElement );
        
        //scene init
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xd7d7d7);
        
        //camera init
        const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 10000);
        camera.position.x = cameraPosition[0];
        camera.position.y = cameraPosition[1];
        camera.position.z = cameraPosition[2];
        camera.lookAt(new THREE.Vector3(0, 10, 0));

        //controls init
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.rotateSpeed = 0.8;

        
        //light init
        const color = 0xffffff;
        const intensity = 1.3;
        const light = new THREE.AmbientLight(color, intensity);
        light.position.set(0, 40, 30);
        scene.add(light);

        //material init
        const mtlLoader = new MTLLoader();

        // MTLLoader Material 파일을 사용할 전역 경로를 설정합니다.
        mtlLoader.setPath(objectFilePath);
        
         // 로드할 Material 파일 명을 입력합니다.
        mtlLoader.load(
            mtlFileName,
            function (materials) {
            // 로드 완료되었을때 호출하는 함수
            // 로드된 재질을이용해서 object만들기
            materials.preload();
            loadOBJLoader(materials);
            console.log('object 재질 로딩완료');
            },
            function (xhr) {
            // 로드되는 동안 호출되는 함수
            console.log('object 재질 로딩 중...');
            },
            function (error) {
            // 로드가 실패했을때 호출하는 함수
            console.log(error);
            alert('MTLLoader 로드 중 오류가 발생하였습니다.');
            }
        );

        //최종적으로 object load후 rendering 하는 함수
        const loadOBJLoader = (materials) => {
            //object init
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath(objectFilePath);
            objLoader.load(
            objFileName,
            (result) => {
                //position 지정하기
                let cent = new THREE.Vector3();
                let size = new THREE.Vector3();
                let bbox = new THREE.Box3().setFromObject(result);

                let boxCenter = bbox.getCenter(cent);
                let boxSize = bbox.getSize(size);

                result.position.x = -boxCenter.x;
                result.position.y = -boxCenter.y;
                result.position.z = -boxCenter.z;

                //z 크기의 2배 (전체화면의 반정도 차게 카메라 이동)
                camera.position.z = boxSize.z * 2;

               // bind3dResizeEvent(renderer);

                //rotation 지정하기
                result.rotation.x = objectRotationXYZ[0];
                result.rotation.y = objectRotationXYZ[1];
                result.rotation.z = objectRotationXYZ[2];

                //로딩된 객체에 재질 입혀주고 rendering하기
                scene.add(result);
                animate();

                console.log('object 객체 로딩완료');
            },
            function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                //$('#loadingSpinner').show();
                console.log('모델 로딩 중');
                if (xhr.total / xhr.loaded === 1) {
                //$('#loadingSpinner').hide();
                }
            },
            function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                console.log(error);
                alert('모델을 로드 중 오류가 발생하였습니다.');
            }
            );
        };


        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            controls.update();
        };
        animate();

    };

      return(
          <div><div ref={viewer} /></div>
      );
    };

  export default ThreeDCubeRender