import { Pi } from "lucide-react";

export const  TAG_TYPES = {
    Hubs: "Hubs" ,
    Pricing: "Pricing" ,
    Merchants: "Merchants" ,
    Riders: "Riders" ,
    Posts: "Posts" ,
    Categories: "Categories" ,
    PickupRequests: "PickupRequests" ,
} as const;

export type TagType = typeof TAG_TYPES[keyof typeof TAG_TYPES];

export const tagTypes = Object.values(TAG_TYPES);
