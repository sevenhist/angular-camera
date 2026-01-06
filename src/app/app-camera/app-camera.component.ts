import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamModule } from 'ngx-webcam';

@Component({
    selector: 'app-camera',
    standalone: true,
    imports: [CommonModule, WebcamModule],
    templateUrl: './app-camera.component.html',
})
export class CameraComponent {

    camData: MediaStream | null = null;
    capturedImage: string = '';
    trigger: Subject<void> = new Subject<void>();
    cameraActive = false;

    get $trigger(): Observable<void> {
        return this.trigger.asObservable();
    }
    // Dauer von der Aufnahme 6 Sekunden 
    // SINGLE BUTTON LOGIC
    async takePhoto() {
        if (this.cameraActive) return;
        // 1️⃣ Start camera
        if (!this.cameraActive) {
            try {
                this.camData = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: 500,
                        height: 500,
                        facingMode: { exact: "environment" } 
                    }
                });
                this.cameraActive = true;
                setTimeout(() => {
                    this.trigger.next();
                }, 150);
            } catch {
                console.error('Camera permission denied');
            }
        }

        // // 2️⃣ Give webcam time to initialize
        // setTimeout(() => {
        //   this.trigger.next();

        //   // 3️⃣ Stop camera after photo
        //   this.stopCamera();
        // }, 400);
    }

    // Capture image
    capture(event: WebcamImage) {
        // мгновенно присвоить
        this.capturedImage = event.imageAsDataUrl;

        console.log(this.capturedImage)

        this.stopCamera();
    }




    // Stop camera
    stopCamera() {
        if (this.camData) {
            this.camData.getTracks().forEach(track => track.stop());
            this.camData = null;
        }
        this.cameraActive = false;
    }
}
