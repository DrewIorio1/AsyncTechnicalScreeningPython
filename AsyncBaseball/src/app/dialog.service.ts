/**
 *
 * dialog service - Class create for moddle design to avoid erros with anular 18
 * 
 */

import { Injectable, Injector, ComponentFactoryResolver, ApplicationRef, EventEmitter } from '@angular/core';
import { CustomDialogComponent } from './custom-dialog/custom-dialog.component'
import { Output } from '@angular/core';
import { Player } from './player.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef
  ) {}

  @Output() saveComplete = new EventEmitter<Player>();


  /**
   * 
   * @param data - Player that is being persisted
   * @param isEditMode -  If control is beign edited or not
   */
  open(data: any, isEditMode: any) {
    const factory = this.resolver.resolveComponentFactory(CustomDialogComponent);
    const componentRef = factory.create(this.injector);
    componentRef.instance.isEditMode = isEditMode;
    componentRef.instance.specialValue = data.Bats;
    componentRef.instance.data = data;
    componentRef.instance.ngOnInit();

    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    componentRef.instance.close.subscribe(() => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    });

    componentRef.instance.save.subscribe((updatedPlayer: Player) => {
      if (updatedPlayer) {
        this.saveComplete.emit(updatedPlayer);

        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
      }
      
    });
  }
}
