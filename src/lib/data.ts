export type RoomStatus = "Occupied" | "Vacant" | "Maintenance";

export type Room = {
  number: string;
  floor: number;
  type: string;
  status: RoomStatus;
  occupied: number;
  capacity: number;
  beds: string[];
  rent: string;
};

// Central demo database for the PG Manager app
export const roomsData: Room[] = [
  // Floor 1
  { number: "101", floor: 1, type: "Single Premium", status: "Occupied", occupied: 1, capacity: 1, beds: ["Arjun Sharma"], rent: "₹8,500" },
  { number: "102", floor: 1, type: "Double Sharing", status: "Vacant", occupied: 0, capacity: 2, beds: ["Ready to assign", "Ready to assign"], rent: "₹6,500" },
  { number: "103", floor: 1, type: "Double Sharing", status: "Occupied", occupied: 2, capacity: 2, beds: ["Kabir Singh", "Riya Shah"], rent: "₹6,500" },
  { number: "104", floor: 1, type: "Triple Sharing", status: "Vacant", occupied: 0, capacity: 3, beds: ["Ready to assign", "Ready to assign", "Ready to assign"], rent: "₹5,200" },
  
  // Floor 2
  { number: "201", floor: 2, type: "Triple Sharing", status: "Occupied", occupied: 2, capacity: 3, beds: ["Dev Patel", "Move-in Friday", "Ready to assign"], rent: "₹5,200" },
  { number: "202", floor: 2, type: "Double Sharing", status: "Occupied", occupied: 2, capacity: 2, beds: ["Rahul K.", "Jane Doe"], rent: "₹6,500" },
  { number: "203", floor: 2, type: "Single Premium", status: "Vacant", occupied: 0, capacity: 1, beds: ["Ready to assign"], rent: "₹8,500" },
  { number: "204", floor: 2, type: "Double Sharing", status: "Occupied", occupied: 1, capacity: 2, beds: ["Alex Smith", "Ready to assign"], rent: "₹6,500" },
  { number: "205", floor: 2, type: "Triple Sharing", status: "Maintenance", occupied: 0, capacity: 3, beds: ["Fan replacement", "Unavailable", "Unavailable"], rent: "₹5,200" },
  
  // Floor 3
  { number: "301", floor: 3, type: "Double Sharing", status: "Vacant", occupied: 0, capacity: 2, beds: ["Ready to assign", "Ready to assign"], rent: "₹6,500" },
  { number: "302", floor: 3, type: "Single Premium", status: "Maintenance", occupied: 0, capacity: 1, beds: ["Painting"], rent: "₹8,500" },
  { number: "303", floor: 3, type: "Triple Sharing", status: "Occupied", occupied: 3, capacity: 3, beds: ["Sam", "Chris", "Pat"], rent: "₹5,200" },
];

export function getRooms(): Room[] {
  return roomsData;
}

export function getRoomById(id: string): Room | undefined {
  return roomsData.find((room) => room.number === id);
}
