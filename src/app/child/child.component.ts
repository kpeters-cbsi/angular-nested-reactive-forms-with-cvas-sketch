import { Component, OnInit, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormGroup,
  Validator,
  AbstractControl,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChildComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChildComponent),
      multi: true
    }
  ]
})
export class ChildComponent implements ControlValueAccessor, Validator, OnInit {
  constructor() {}

  @Input() index!: number;

  get stepName(): FormControl {
    return this.stepForm.get('name') as FormControl;
  }

  get action(): FormControl {
    return this.stepForm.get('action') as FormControl;
  }

  get valueCtrl(): FormControl {
    return this.stepForm.get('value') as FormControl;
  }

  get showValue(): boolean {
    return this.action.value === 'one';
  }
  // get valid(): boolean {
  //   return this.stepForm.valid;
  // }

  actions = [
    { description: 'Action One', value: 'one' },
    { description: 'Action Two', value: 'two' },
    { description: 'CRAZY GO NUTS', value: 'blarg'}
  ];

  public stepForm: FormGroup;

  public ngOnInit() {

      this.stepForm = new FormGroup({
        name: new FormControl(`Step ${this.index}`, [Validators.required]),
        action: new FormControl('', [Validators.required]),
        value: new FormControl('')
      });
    

  }

  public onTouched: () => void = () => {
    console.log('ChildComponent onTouched');
  };

  writeValue(val: unknown): void {
    console.log('ChildComponent writeValue');
    val && this.stepForm.setValue(val, { emitEvent: false });
  }

  registerOnChange(fn: unknown): void {
    console.log('ChildComponent onChange()');
    this.stepForm.valueChanges
      .pipe(tap(() => console.log('change')))
      .subscribe(fn);
  }

  registerOnTouched(fn: () => void): void {
    console.log('ChildComponent onTouched');
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    console.log('ChildComponent setDisabledState');
    isDisabled ? this.stepForm.disable() : this.stepForm.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    console.log(`Validating step ${this.index}`, { c });
    return this.stepForm.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: `Step ${this.index} invalid: ${this.stepForm.errors}`
          }
        };
  }
}
