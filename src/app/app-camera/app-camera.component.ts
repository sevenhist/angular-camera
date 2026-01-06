import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamModule } from 'ngx-webcam';

@Component({
    selector: 'app-camera',
    standalone: true,
    imports: [CommonModule, WebcamModule],
    templateUrl: './app-camera.component.html',
})
export class CameraComponent {

    capturedImage = '';
    private trigger = new Subject<void>();
    showWebcam = false;

    get trigger$(): Observable<void> {
        return this.trigger.asObservable();
    }

    takePhoto() {
        // 1️⃣ показать webcam
        this.showWebcam = true;

        // 2️⃣ дождаться, пока Angular отрендерит <webcam>
        setTimeout(() => {
            this.trigger.next();
        }, 0);
    }

    capture(event: WebcamImage) {
        this.capturedImage = event.imageAsDataUrl;
        console.log('Фото сделано');

        // 3️⃣ выключить камеру
        this.showWebcam = false;
    }
}
