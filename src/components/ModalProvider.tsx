"use client"

import { useEffect, useState } from "react"
import { ProModal } from "@/components/ProModal";

export const ModalProvider = () => {
    const [isMouted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    } ,[])

    if (!isMouted) return null;
    
    return (
        <>
            <ProModal />
        </>
    )
}