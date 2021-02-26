import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ComponentMessageModel } from '../models/component-messaging.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentMessagingService {
  private subject = new Subject<any>();
  private replaySubject = new ReplaySubject<any>(50);

  constructor() { }

  sendMessage(message: ComponentMessageModel) {
      this.subject.next(message);
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }

  sendReplayMessage(message: ComponentMessageModel) {
    this.replaySubject.next(message);
  }

  clearReplayMessage() {
      this.replaySubject.next();
  }

  getReplayMessage(): Observable<any> {
      return this.replaySubject.asObservable();
  }
  sendButtonMessage(message: ComponentMessageModel) {
    this.replaySubject.next(message);
  }

  clearButtonMessage() {
      this.replaySubject.next();
  }

  getButtonMessage(): Observable<any> {
      return this.replaySubject.asObservable();
  }
}
