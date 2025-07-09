'use server';
/**
 * @fileOverview An AI flow for finding properties based on a natural language query.
 *
 * - findProperties - A function that translates a user query into structured property filters.
 * - FindPropertiesInput - The input type for the findProperties function.
 * - FindPropertiesOutput - The return type for the findProperties function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const FindPropertiesInputSchema = z.string().describe('A natural language query for finding a property.');
export type FindPropertiesInput = z.infer<typeof FindPropertiesInputSchema>;


const FindPropertiesOutputSchema = z.object({
  Rent: z.object({
    type: z.string().optional().describe("Should be 'Rent' or 'Buy'."),
  }).optional(),
  Apartment: z.object({
    type: z.string().optional().describe("The type of property, e.g., 'Apartment', 'Penthouse', 'Villa', 'Townhouse'."),
  }).optional(),
  'Beds & Baths': z.object({
    beds: z.string().optional().describe("Number of bedrooms, e.g., 'Studio', '1', '2', '3', '4+'."),
    baths: z.string().optional().describe("Number of bathrooms, e.g., '1', '2', '3', '4', '5+'."),
  }).optional(),
  Price: z.object({
    min_price: z.number().optional().describe('The minimum price.'),
    max_price: z.number().optional().describe('The maximum price.'),
    period: z.string().optional().describe("The rental period, e.g., 'Yearly' or 'Monthly'."),
  }).optional(),
  'More Filters': z.object({
    furnishing: z.string().optional().describe("Furnishing status, either 'Furnished' or 'Unfurnished'."),
    min_area: z.number().optional().describe('The minimum area in square feet.'),
    max_area: z.number().optional().describe('The maximum area in square feet.'),
    amenities: z.array(z.string()).optional().describe('A list of required amenities.'),
  }).optional(),
}).describe('Structured filters for a property search.');

export type FindPropertiesOutput = z.infer<typeof FindPropertiesOutputSchema>;

export async function findProperties(query: FindPropertiesInput): Promise<FindPropertiesOutput> {
  if (!query) return {};
  return findPropertiesFlow(query);
}

const allAmenities = ['Maids Room', 'Balcony', 'Shared Pool', 'Shared Spa', 'Shared Gym', 'Central A/C', 'Concierge Service', 'Covered Parking', 'View of Water', 'View of Landmark', 'Pets Allowed', 'Children\'s Play Area', 'Children\'s Pool', 'Barbecue Area', 'Built in Wardrobes', 'Study', 'Walk-in Closet', 'Private Jacuzzi'];

const findPropertiesPrompt = ai.definePrompt({
  name: 'findPropertiesPrompt',
  input: { schema: z.object({ query: z.string() }) },
  output: { schema: FindPropertiesOutputSchema },
  prompt: `You are an intelligent real estate search assistant. Your task is to parse the user's search query and convert it into a structured JSON format for filtering properties.

  User Query:
  "{{{query}}}"
  
  Analyze the query and extract the relevant criteria for the following fields. If a criterion is not mentioned, omit the field.
  
  - Property Type (Apartment.type): Can be 'Apartment', 'Penthouse', 'Villa', 'Townhouse'.
  - Bedrooms ('Beds & Baths'.beds): Can be 'Studio', '1', '2', '3', '4+'.
  - Bathrooms ('Beds & Baths'.baths): Can be '1', '2', '3', '4', '5+'.
  - Price (Price.min_price, Price.max_price): Extract minimum and maximum price.
  - Rental Period (Price.period): Can be 'Yearly' or 'Monthly'. Default to 'Yearly' if not specified but a price is mentioned.
  - Furnishing ('More Filters'.furnishing): Can be 'Furnished' or 'Unfurnished'.
  - Area ('More Filters'.min_area, 'More Filters'.max_area): Extract minimum and maximum area in square feet.
  - Amenities ('More Filters'.amenities): Extract any mentioned amenities from this list: ${allAmenities.join(', ')}.

  Return the result as a structured JSON object matching the output schema. Be concise and only return the JSON object.`,
});

const findPropertiesFlow = ai.defineFlow(
  {
    name: 'findPropertiesFlow',
    inputSchema: FindPropertiesInputSchema,
    outputSchema: FindPropertiesOutputSchema,
  },
  async (query) => {
    const { output } = await findPropertiesPrompt({ query });
    return output || {};
  }
);
