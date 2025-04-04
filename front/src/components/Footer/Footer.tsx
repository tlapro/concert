import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";


export default function Footer() {
    return (
        <footer className="mt-20 mb-10 h-40 border-t-2 border-neutral-900 bg-neutral-950 text-neutral-200 flex flex-col items-center justify-center text-center p-6">
            <p className="text-2xl font-bold mt-10">Festival de Rock Nacional</p>
            <p className="text-sm text-neutral-400 mt-1">&copy; 2024 Todos los derechos reservados</p>
            <div className="flex gap-6 mt-6 mb-10">
                <a href="#" className="text-neutral-400 hover:text-orange-500 transition text-2xl">
                    <FaFacebook />
                </a>
                <a href="#" className="text-neutral-400 hover:text-orange-500 transition text-2xl">
                    <FaInstagram />
                </a>
                <a href="#" className="text-neutral-400 hover:text-orange-500 transition text-2xl">
                    <FaXTwitter />
                </a>
            </div>
        </footer>
    );
}
