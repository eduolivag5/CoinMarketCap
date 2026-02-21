import { z } from 'zod';

const StatusObjectSchema = z.object({
    timestamp: z.string(),
    error_code: z.number(),
    error_message: z.string().nullable()
})

const QuoteSchema = z.object({
    USD: z.object({
        price: z.number().nullable(),
        volume_24h: z.number(),
        volume_change_24h: z.number(),
        percent_change_1h: z.number(),
        percent_change_24h: z.number(),
        percent_change_7d: z.number(),
        percent_change_30d: z.number(),
        percent_change_60d: z.number(),
        percent_change_90d: z.number(),
        market_cap: z.number().nullable(),
        market_cap_dominance: z.number(),
        fully_diluted_market_cap: z.number(),
        last_updated: z.string(),
    }),
});

const CryptoPrincipalDataSchema = z.object({
    id: z.number(),
    name: z.string(),
    symbol: z.string(),
    slug: z.string(),
    cmc_rank: z.number().nullable(),
    logo: z.string().optional(),
    quote: QuoteSchema,
});

export const CryptoListingsListSchema = z.object({
    status: StatusObjectSchema,
    data: z.array(CryptoPrincipalDataSchema)
});

export type CryptoPrincipalDataType = z.infer<typeof CryptoPrincipalDataSchema>;



export const CryptoQuotesListSchema = z.object({
    data: z.record(CryptoPrincipalDataSchema)
})


// CRIPTO DETAILS
export const CryptoDetailsSchema = z.object({
    status: StatusObjectSchema,
    data: z.record(
        z.object({
            id: z.number(),
            name: z.string(),
            symbol: z.string(),
            category: z.string(),
            description: z.string(),
            logo: z.string(),
            urls: z.object({
                website: z.array(z.string()),
                twitter: z.array(z.string()),
                explorer: z.array(z.string()),
                source_code: z.array(z.string()),
            }),
            date_added: z.string(),
            date_launched: z.string().nullable(),
            contract_address: z.array(
                z.object({
                    contract_address: z.string(),
                    platform: z.object({
                        name: z.string(),
                        coin: z.object({
                            id: z.string(),
                            name: z.string(),
                            symbol: z.string(),
                            slug: z.string()
                        }),
                    })
                })
            ),
        })
    )
})

const QuotesDetailsSchema = z.object({
    id: z.number(),
    name: z.string(),
    symbol: z.string(),
    slug: z.string(),
    max_supply: z.number().nullable(),
    circulating_supply: z.number().nullable(),
    total_supply: z.number().nullable(),
    cmc_rank: z.number(),
    quote: QuoteSchema,
})

export const CryptoQuotesDetailsSchema = z.object({
    status: StatusObjectSchema,
    data: z.record(
        QuotesDetailsSchema
    )
})

export type QuoteSchemaType = z.infer<typeof QuotesDetailsSchema>;

const SearchItemSchema = z.object({
    id: z.number(),
    rank: z.number().nullable(),
    name: z.string(),
    symbol: z.string(),
    slug: z.string(),
    logo: z.string().optional(),
    platform: z.object({
        id: z.number(),
        name: z.string(),
        symbol: z.string(),
        slug: z.string(),
        token_address: z.string(),
    }).nullable(),
    quotes: QuoteSchema.optional()
})


const SearchItemsSchema = z.array(SearchItemSchema)

export type SearchItemsType = z.infer<typeof SearchItemsSchema>;
export type SearchItemType = z.infer<typeof SearchItemSchema>;

export const SearchSchema = z.object({
    status: StatusObjectSchema,
    data: SearchItemsSchema.optional()
})


export const FearAndGreedIndexSchema = z.object({
    data: z.object({
        value: z.number(),
        update_time: z.string(),
        value_classification: z.string()
    })
})

export const GlobalMetricsSchema = z.object({
    data: z.object({
        active_cryptocurrencies: z.number(),
        total_cryptocurrencies: z.number(),
        active_market_pairs: z.number(),
        active_exchanges: z.number(),
        total_exchanges: z.number(),
        eth_dominance: z.number(),
        btc_dominance: z.number(),
        eth_dominance_yesterday: z.number(),
        btc_dominance_yesterday: z.number(),
        eth_dominance_24h_percentage_change: z.number(),
        btc_dominance_24h_percentage_change: z.number(),
        defi_volume_24h: z.number(),
        defi_market_cap: z.number(),
        defi_24h_percentage_change: z.number(),
        stablecoin_volume_24h: z.number(),
        stablecoin_market_cap: z.number(),
        stablecoin_24h_percentage_change: z.number(),
        quote: z.object({
            USD: z.object({
                total_market_cap: z.number(),
                total_volume_24h: z.number(),
                altcoin_volume_24h: z.number(),
                altcoin_market_cap: z.number(),
                defi_volume_24h: z.number(),
                defi_market_cap: z.number(),
                defi_24h_percentage_change: z.number(),
                stablecoin_volume_24h: z.number(),
                stablecoin_market_cap: z.number(),
                stablecoin_24h_percentage_change: z.number(),
                total_market_cap_yesterday: z.number(),
                total_volume_24h_yesterday: z.number(),
                total_market_cap_yesterday_percentage_change: z.number(),
                total_volume_24h_yesterday_percentage_change: z.number(),
                last_updated: z.string(),
            })
        })
    })
})



/* CATEGORIAS */
const CategorySchema = z.object({
    id: z.string(),
    name: z.string(),
    title: z.string(),
    description: z.string(),
    num_tokens: z.number(),
    avg_price_change: z.number().nullable(),
    market_cap: z.number(),
    market_cap_change: z.number().nullable(),
    volume: z.number(),
    volume_change: z.number().nullable(),
})

export const CategoriesSchema = z.object({
    data: z.array(CategorySchema)
})

export type CategoryType = z.infer<typeof CategorySchema>

export const CategoryDetailsSchema = z.object({
    data: CategorySchema.extend({
        coins: z.array(CryptoPrincipalDataSchema)
    })
})

export type CategoryDetailsType = z.infer<typeof CategoryDetailsSchema>

export type PortfolioItem = {
    coin: SearchItemType;
    amount: number;
    averagePrice: number;
    totalValue: number;
    totalInvested: number;
}