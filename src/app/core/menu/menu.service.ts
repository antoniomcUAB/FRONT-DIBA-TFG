import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state?: string;
  name?: string;
  type: string;
  icon?: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS: Menu[] = [
  {
    type: 'title',
    name: 'MENU'
  },
  {
    state: '/',
    name: 'VEURE EXPEDIENTS',
    type: 'link',
    icon: 'ion-ios-box',
  },
  {
    state: 'email',
    name: 'CREAR NOU EXPEDIENT',
    type: 'link',
    icon: 'ion-ios-folder'
  },
  {
    type: 'divider'
  }
];

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
