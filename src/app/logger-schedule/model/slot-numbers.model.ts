export interface SlotNumber {
    numberKind: SlotNumberKind,
    slots: TimeSlotNumber[]
}

export enum SlotNumberKind {
    Unknown,

    // Number of unassigned games starting that block
    U,
    // Total number of games starting that block
    T,
    // Number of people on shift for that block
    S
}

export interface TimeSlotNumber {
    from: Time,
    to: Time,

    number: number;
}

export interface Time {
    hour: number;
    minute: number;
}