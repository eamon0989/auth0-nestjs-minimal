import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ProfileService } from './profile.service';
import { catchError, filter, firstValueFrom, map, tap } from 'rxjs';
import { CreateInvitationDto, InvitationDto } from '../shared/models';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog.component';
import { CreateCompanyComponent } from './create-company.component';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    CreateCompanyComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  selector: 'app-company',
  template: `
    <div class="flex flex-col gap-8">
      <app-create-company *ngIf="!company()"></app-create-company>

      <div
        class="flex gap-4 rounded-md p-4 border border-gray-300 flex-col max-w-3xl"
        *ngIf="this.company() as company"
      >
        <h2>Company</h2>
        <div class="flex flex-col">
          <span><strong>Name:</strong> {{ company.name }}</span>
          <span><strong>VAT:</strong> {{ company.VAT }}</span>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyComponent {
  private readonly profileService = inject(ProfileService);
  readonly company = computed(() => this.profileService.companies()?.[0]);
}
