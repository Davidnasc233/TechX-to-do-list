import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class TodolistComponent {
  task: string = '';
  tasks: { title: string; done: boolean }[] = [];

  taskArray = [{taskName: 'instalar vscode', done: false}];

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    if (form.controls['task'].value.trim()) {
      this.taskArray.push({ taskName: form.controls['task'].value.trim(), done: false });
      form.resetForm();
    }
  }

  editIndex: number | null = null;
  editTask: string = '';

  startEdit(index: number) {
    this.editIndex = index;
    this.editTask = this.taskArray[index].taskName;
  }
  
  saveEdit() {
    if (this.editIndex !== null && this.editTask.trim()) {
      this.taskArray[this.editIndex].taskName = this.editTask.trim();
      this.cancelEdit();
    }
  }
  
  cancelEdit() {
    this.editIndex = null;
    this.editTask = '';
  }
  

  removeTask(index: number) {
    if (confirm(`Deseja apagar a tarefa "${this.taskArray[index].taskName}"?`)) {
      this.taskArray.splice(index, 1);
    }
  }

  toggleDone(index: number) {
    this.taskArray[index].done = !this.taskArray[index].done;
  }
}

