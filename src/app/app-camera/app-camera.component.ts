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
    capturedImage: string = '';
    trigger: Subject<void> = new Subject<void>();
    cameraActive = false;

    get $trigger(): Observable<void> {
        return this.trigger.asObservable();
    }

    // Главная и единственная функция
    async takePhoto() {
        if (this.cameraActive) return; // Защита от спама кликами
        
        this.cameraActive = true; 
        // Теперь мы просто ждем. 
        // Фото будет сделано автоматически, когда сработает (cameraSwitched) или (imageCapture)
    }

    // Этот метод вызовется АВТОМАТИЧЕСКИ, когда камера будет готова в DOM
    handleCameraInit() {
        // Небольшая задержка, чтобы картинка успела стабилизироваться (фокус, свет)
        setTimeout(() => {
            this.trigger.next();
        }, 1500); 
    }

    capture(event: WebcamImage) {
        this.capturedImage = event.imageAsDataUrl;
        this.stopCamera();
    }

    stopCamera() {
        this.cameraActive = false;
    }
}