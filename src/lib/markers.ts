export interface Marker {
  id: number;
  left: number;
  top: number;
  clickable?: boolean;
  itemId?: string;
}

export const markers: Marker[] = [
  {
    id: 1,
    left: 214,
    top: 103,
    clickable: true,
    itemId: 't1'
  },
  {
    id: 2,
    left: 230,
    top: 170,
  },
  {
    id: 3,
    left: 229,
    top: 238,
    clickable: true,
    itemId: 't2'
  }
];
