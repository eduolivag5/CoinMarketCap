import { FiClipboard } from "react-icons/fi";

interface ContractsProps {
    contracts: Array<{
        contract_address: string;
        platform: {
            name: string;
            coin: {
                id: string;
                name: string;
                symbol: string;
                slug: string;
            };
        };
    }>;
}

export default function Contracts({ contracts }: ContractsProps) {
    const handleCopy = (address: string) => {
        navigator.clipboard.writeText(address).catch((err) => {
            console.error("Failed to copy text: ", err);
        });
    };

    return (
        <div className="w-full overflow-x-auto">
            {contracts.length > 0 ? (
                <table className="text-sm w-full table-auto">
                    <thead>
                        <tr className="bg-secondary border-b border-secondary">
                            <th className="px-4 py-2 text-left">Platform</th>
                            <th className="px-4 py-2 text-left">Contract Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.map((contract) => (
                            <tr className="text-xs" key={contract.contract_address}>
                                <td className="px-4 py-2">{contract.platform.name}</td>
                                <td className="px-4 py-2 font-light flex items-center gap-2">
                                    <span className="block truncate max-w-32 md:max-w-full whitespace-nowrap">
                                        {contract.contract_address}
                                    </span>
                                    <button
                                        className="rounded-full p-1 transition-colors duration-200 bg-secondary hover:bg-primary focus:bg-primary"
                                        onClick={() => handleCopy(contract.contract_address)}
                                    >
                                        <FiClipboard className="w-3 h-3" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-sm font-normal">No se han encontrado contratos para este criptomoneda.</p>
            )}
        </div>
    );
}
