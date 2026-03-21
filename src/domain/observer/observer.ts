import { DomainEvent } from "../events/events";

export type Observer = (event: DomainEvent) => void;

let observers: Observer[] = [];

export function subscribe(observer: Observer): void {
  observers.push(observer);
}

export function unsubscribe(observer: Observer): void {
  observers = observers.filter((obs) => obs !== observer);
}

export function emit(event: DomainEvent): void {
  observers.forEach((observer) => observer(event));
}
