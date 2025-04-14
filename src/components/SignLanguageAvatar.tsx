
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

// Basic sign language animations
const ANIMATIONS = [
  { id: 'hello', name: 'Hello', duration: 2000 },
  { id: 'thank_you', name: 'Thank You', duration: 2500 },
  { id: 'please', name: 'Please', duration: 1800 },
  { id: 'yes', name: 'Yes', duration: 1200 },
  { id: 'no', name: 'No', duration: 1200 },
  { id: 'help', name: 'Help', duration: 2000 },
];

const SignLanguageAvatar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<string>('hello');
  const [avatarRotation, setAvatarRotation] = useState(0);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const avatarRef = useRef<THREE.Group | null>(null);
  
  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      45, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 1.5, 5);
    camera.lookAt(0, 1, 0);
    cameraRef.current = camera;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Create a ground plane
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x999999,
      roughness: 0.8,
      metalness: 0.2,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Create a simple avatar (placeholder for a real avatar model)
    const avatar = createSimpleAvatar();
    scene.add(avatar);
    avatarRef.current = avatar;
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      requestAnimationFrame(animate);
      
      // Rotate avatar based on slider
      if (avatarRef.current) {
        avatarRef.current.rotation.y = avatarRotation * Math.PI * 2;
      }
      
      // Render scene
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of Three.js resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [avatarRotation]);
  
  // Create a simple humanoid figure
  const createSimpleAvatar = () => {
    const avatar = new THREE.Group();
    
    // Materials
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3b82f6, 
      roughness: 0.7,
      metalness: 0.3
    });
    const headMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xf59e0b, 
      roughness: 0.7,
      metalness: 0.1
    });
    
    // Head
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 32, 32),
      headMaterial
    );
    head.position.y = 1.7;
    head.castShadow = true;
    avatar.add(head);
    
    // Torso
    const torso = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.8, 0.3),
      bodyMaterial
    );
    torso.position.y = 1.2;
    torso.castShadow = true;
    avatar.add(torso);
    
    // Create limbs
    const createLimb = (x: number, y: number, z: number, length: number, width: number, isArm: boolean) => {
      const limb = new THREE.Mesh(
        new THREE.BoxGeometry(width, length, width),
        bodyMaterial
      );
      limb.position.set(x, y, z);
      limb.castShadow = true;
      
      // For arms, the pivot should be at the top
      if (isArm) {
        limb.geometry.translate(0, -length/2, 0);
        limb.position.y += length/2;
      }
      
      return limb;
    };
    
    // Arms
    const leftArm = createLimb(-0.35, 1.4, 0, 0.6, 0.15, true);
    const rightArm = createLimb(0.35, 1.4, 0, 0.6, 0.15, true);
    avatar.add(leftArm);
    avatar.add(rightArm);
    
    // Legs
    const leftLeg = createLimb(-0.2, 0.6, 0, 0.7, 0.15, false);
    const rightLeg = createLimb(0.2, 0.6, 0, 0.7, 0.15, false);
    avatar.add(leftLeg);
    avatar.add(rightLeg);
    
    return avatar;
  };
  
  // Simulate playing an animation
  const playAnimation = (animationId: string) => {
    setIsPlaying(true);
    setCurrentAnimation(animationId);
    
    // Get animation duration
    const animation = ANIMATIONS.find(anim => anim.id === animationId);
    const duration = animation?.duration || 2000;
    
    // Simulate animation by moving avatar parts
    if (avatarRef.current) {
      // Get avatar parts
      const [head, torso, leftArm, rightArm, leftLeg, rightLeg] = avatarRef.current.children;
      
      // Reset positions
      resetAvatarPose();
      
      // Perform animation based on animationId
      switch (animationId) {
        case 'hello':
          // Wave right arm
          animateArm(rightArm as THREE.Mesh, { 
            rotationZ: -Math.PI / 3,
            cycles: 3,
            duration: duration 
          });
          break;
          
        case 'thank_you':
          // Hands together in front
          animateArm(leftArm as THREE.Mesh, { 
            rotationZ: Math.PI / 4,
            rotationY: -Math.PI / 6,
            duration: duration / 2
          });
          animateArm(rightArm as THREE.Mesh, { 
            rotationZ: -Math.PI / 4,
            rotationY: Math.PI / 6,
            duration: duration / 2
          });
          break;
          
        case 'please':
          // Circular motion with right hand
          animateArm(rightArm as THREE.Mesh, { 
            rotationZ: -Math.PI / 4,
            circular: true,
            duration: duration
          });
          break;
          
        case 'yes':
          // Nod head
          animateHead(head as THREE.Mesh, {
            rotationX: Math.PI / 12,
            cycles: 2,
            duration: duration
          });
          break;
          
        case 'no':
          // Shake head
          animateHead(head as THREE.Mesh, {
            rotationY: Math.PI / 12,
            cycles: 2,
            duration: duration
          });
          break;
          
        case 'help':
          // Both hands up
          animateArm(leftArm as THREE.Mesh, { 
            rotationZ: Math.PI / 2.5,
            duration: duration / 2
          });
          animateArm(rightArm as THREE.Mesh, { 
            rotationZ: -Math.PI / 2.5,
            duration: duration / 2
          });
          break;
      }
      
      // End animation after duration
      setTimeout(() => {
        setIsPlaying(false);
      }, duration);
    }
  };
  
  // Reset avatar to default pose
  const resetAvatarPose = () => {
    if (!avatarRef.current) return;
    
    avatarRef.current.children.forEach(child => {
      child.rotation.set(0, 0, 0);
    });
  };
  
  // Animate a limb
  const animateArm = (
    arm: THREE.Mesh, 
    options: { 
      rotationX?: number, 
      rotationY?: number, 
      rotationZ?: number,
      circular?: boolean,
      cycles?: number,
      duration: number 
    }
  ) => {
    const { rotationX = 0, rotationY = 0, rotationZ = 0, circular = false, cycles = 1, duration } = options;
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const animate = () => {
      const now = Date.now();
      
      if (now >= endTime) {
        arm.rotation.set(0, 0, 0);
        return;
      }
      
      const progress = (now - startTime) / duration;
      const cycleProgress = (progress * cycles) % 1;
      
      if (circular) {
        // Circular motion
        arm.rotation.z = -Math.PI / 4;
        arm.rotation.x = Math.sin(cycleProgress * Math.PI * 2) * 0.3;
        arm.rotation.y = Math.cos(cycleProgress * Math.PI * 2) * 0.3;
      } else {
        // Oscillating motion
        const wave = Math.sin(cycleProgress * Math.PI * 2);
        
        if (rotationX) arm.rotation.x = wave * rotationX;
        if (rotationY) arm.rotation.y = wave * rotationY;
        if (rotationZ) arm.rotation.z = rotationZ;
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
  };
  
  // Animate head
  const animateHead = (
    head: THREE.Mesh, 
    options: { 
      rotationX?: number, 
      rotationY?: number, 
      cycles?: number,
      duration: number 
    }
  ) => {
    const { rotationX = 0, rotationY = 0, cycles = 1, duration } = options;
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const animate = () => {
      const now = Date.now();
      
      if (now >= endTime) {
        head.rotation.set(0, 0, 0);
        return;
      }
      
      const progress = (now - startTime) / duration;
      const cycleProgress = (progress * cycles) % 1;
      const wave = Math.sin(cycleProgress * Math.PI * 2);
      
      if (rotationX) head.rotation.x = wave * rotationX;
      if (rotationY) head.rotation.y = wave * rotationY;
      
      requestAnimationFrame(animate);
    };
    
    animate();
  };
  
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto space-y-4">
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-medium">3D Sign Language Avatar</h3>
        <p className="text-muted-foreground text-sm">
          Visual representation of ISL gestures through a 3D avatar.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div 
          ref={containerRef} 
          className="aspect-video md:w-2/3 h-[300px] bg-muted rounded-lg border border-border overflow-hidden"
        />
        
        <Card className="md:w-1/3">
          <CardContent className="pt-6 flex flex-col space-y-4">
            <div className="space-y-4">
              <h4 className="font-medium">Animations</h4>
              <div className="grid grid-cols-2 gap-2">
                {ANIMATIONS.map((animation) => (
                  <Button
                    key={animation.id}
                    variant={currentAnimation === animation.id ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => playAnimation(animation.id)}
                    disabled={isPlaying}
                  >
                    {animation.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Rotate Avatar</label>
              <Slider
                value={[avatarRotation]}
                onValueChange={([value]) => setAvatarRotation(value)}
                min={0}
                max={1}
                step={0.01}
              />
            </div>
            
            <div className="flex space-x-2">
              {isPlaying ? (
                <Button 
                  variant="secondary" 
                  className="w-full"
                  disabled
                >
                  <Pause className="mr-2 h-4 w-4" />
                  Playing...
                </Button>
              ) : (
                <Button 
                  className="w-full"
                  onClick={() => playAnimation(currentAnimation)}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Play
                </Button>
              )}
              
              <Button 
                variant="outline"
                onClick={resetAvatarPose}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignLanguageAvatar;
