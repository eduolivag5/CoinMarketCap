import { FaGlobe, FaTwitter, FaGithub } from "react-icons/fa";

export default function CoinInformation({ data }: { data: any }) {
    return (
        <table className="text-xs w-full border-collapse border-none">
            <tbody className="divide-y divide-secondary/20 border-none">
                {data.urls.website.length > 0 && 
                    <tr className="border-none">
                        <td className="font-semibold py-3 whitespace-nowrap opacity-70 border-none">Web</td>
                        <td className="text-right py-3 border-none">
                            <a
                                href={data.urls.website[0]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors duration-200 bg-secondary/20 rounded-full px-4 py-1.5 text-blue-400 hover:text-blue-500 inline-flex items-center gap-2 font-medium border-none"
                            >
                                <FaGlobe /> Sitio web
                            </a>
                        </td>
                    </tr>
                }
                
                {data.urls.twitter.length > 0 && 
                    <tr className="border-none">
                        <td className="font-semibold py-3 whitespace-nowrap opacity-70 border-none">Twitter</td>
                        <td className="text-right py-3 border-none">
                            <a
                                href={data.urls.twitter[0]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors duration-200 bg-secondary/20 rounded-full px-4 py-1.5 text-blue-400 hover:text-blue-500 inline-flex items-center gap-2 font-medium border-none"
                            >
                                <FaTwitter /> Twitter
                            </a>
                        </td>
                    </tr>
                }

                {data.urls.source_code.length > 0 && 
                    <tr className="border-none">
                        <td className="font-semibold py-3 whitespace-nowrap opacity-70 border-none">Código fuente</td>
                        <td className="text-right py-3 border-none">
                            <a
                                href={data.urls.source_code[0]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors duration-200 bg-secondary/20 rounded-full px-4 py-1.5 text-blue-400 hover:text-blue-500 inline-flex items-center gap-2 font-medium border-none"
                            >
                                <FaGithub /> Github
                            </a>
                        </td>
                    </tr>
                }

                {data.date_added && 
                    <tr className="border-none">
                        <td className="font-semibold py-3 whitespace-nowrap opacity-70 border-none">Añadido</td>
                        <td className="text-right py-3 font-medium opacity-90 border-none">
                            {new Date(data.date_added).toLocaleDateString("es-ES", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    );
}