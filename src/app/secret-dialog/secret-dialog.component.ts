import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-secret-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './secret-dialog.component.html',
  styleUrl: './secret-dialog.component.css'
})
export class SecretDialogComponent {
  @Output() secretSubmitted = new EventEmitter<string>();
  secretInput: string = '';
  errorMessage: string = '';

  onSubmit() {
    if (this.secretInput.trim()) {
      this.secretSubmitted.emit(this.secretInput);
      this.secretInput = '';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please enter a secret word';
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
  }
}
