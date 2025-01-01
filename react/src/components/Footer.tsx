import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-secondary text-text py-6">
            <div className="container mx-auto flex flex-col items-center">
                <div className="text-center">
                    <p className="text-sm font-bold">© 2024 Coinmarketcap</p>                    
                </div>                

                <div className="mt-4 text-center flex flex-col gap-1 items-center justify-center">    
                    <p className="text-sm">By Eduardo Oliva</p>
                    <div className="flex gap-4">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            <FaTwitter />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            <FaFacebook />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            <FaLinkedin />
                        </a>
                    </div>                    
                </div>
            </div>
        </footer>
    );
}
