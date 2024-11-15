import { getSinglePokemon } from '@/app/service/getPokemonList';
import { jest } from '@jest/globals';

describe('getSinglePokemon', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should fetch and return a single pokemon detail data', async () => {
        const mockPokemonData = {
            name: 'bulbasaur',
            id: 1,
            order: 1,
            height: 7,
            weight: 69,
            types: [{ slot: 1, type: { name: 'grass' } }, { slot: 2, type: { name: 'poison' } }],
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue(mockPokemonData),
        });

        const result = await getSinglePokemon('bulbasaur');

        expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/bulbasaur');
        expect(result).toEqual(mockPokemonData);
    });

    it('Should handle fetch errors', async () => {
        fetch.mockRejectedValueOnce(new Error('Failed to fetch pokemon data'));
        await expect(getSinglePokemon('bulbasaur')).rejects.toThrow('Failed to fetch pokemon data');
    });
});
