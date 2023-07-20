"use client"

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "@/components/ui/button";

const LandingHero = () => {
    const { isSignedIn } = useAuth();

    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl sapce-y-5 font-extrabold">
                <h1>A Melhor Ferramenta de IA</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    <TypewriterComponent 
                        options={{
                            strings: [
                                "Bot de Bate-papo.",
                                "Geração de Código.",
                                "Geração de Foto.",
                                "Geração de Música.",
                                "Geração de Vídeo."
                            ],
                            autoStart: true,
                            loop: true
                        }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Crie conteúdo usando IA 10x mais rápido.
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant="premium" className="md:text-lg p-4 rounded-full font-semibold">
                        Comece Gratuitamente
                    </Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
                nenhum cartão de crédito necessário.
            </div>
        </div>
    )
}

export default LandingHero;