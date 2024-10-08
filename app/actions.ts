'use server'

import { VertexAI } from '@google-cloud/vertexai';
import { GoogleAuth } from 'google-auth-library';
const auth = new GoogleAuth();

export async function getFunFactsAction(animal: string) {
    const project = await auth.getProjectId();

    const vertex = new VertexAI({ project: project });
    const generativeModel = vertex.getGenerativeModel({
        model: 'gemini-1.5-flash'
    });

    const prompt = `Give me 10 fun facts about ${animal || 'dog'}. 
            Return as json as an array in the format ['fact 1', 'fact 2']
            Remove backticks and other markdown formatting.`;
    const resp = await generativeModel.generateContent(prompt);

    if (!resp.response.candidates) {
        throw new Error('Did not receive response candidates.')
    }

    console.log({ text: resp.response.candidates[0].content.parts[0].text })

    const factArray = JSON.parse(resp.response.candidates[0].content.parts[0].text || '');
    return factArray;
};