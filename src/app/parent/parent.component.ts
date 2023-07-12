import { AfterContentInit, ChangeDetectorRef, Component, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements AfterContentInit {
  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  items = [''];

  public parentForm: FormGroup;

  ngAfterContentInit() {
    this.parentForm = new FormGroup({
      name: new FormControl(),
      url: new FormControl(),
      steps: new FormArray([new FormControl(), new FormControl({name: 'Fizz', action: 'blarg'}), new FormControl({name: 'Woobly woo', action: 'one', value: 'Arghfal'})])
    });
    this.changeDetectorRef.detectChanges();
  }

  get steps(): FormArray {
    return this.parentForm.get('steps') as FormArray
  }
  
  public fetchStepControl(index: number): FormControl {
    return this.steps?.at(index) as FormControl;
  }

  public onSubmit(): void {
    console.debug('Stumbit!', { formValue: this.parentForm.value });
  }

  get invalidIndices(): number[] {
    const invalid = []
    for (let i = 0; i < this.steps.length; i++) {
      const step = this.steps.at(i)
      if (step.invalid) {
        invalid.push(i + 1)
      }
    }
    return invalid
  }

  addItem(): void {
    this.steps.push(new FormControl())
  }

  removeItem(i: number): void {
    if (this.steps.length === 1) {
      this.steps.removeAt(i, { emitEvent: false });
      this.steps.push(new FormControl());
      this.changeDetectorRef.detectChanges();
    } else {
      this.steps.removeAt(i);
    }
  }

  preview(): void {
    console.debug('CALL preview()');
    console.debug('Preview', { formValue: this.parentForm.value });
  }

  // OLD STUFF
  previewItems = [];
}
