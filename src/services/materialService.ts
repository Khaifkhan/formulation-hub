import apiClient, { buildODataQuery, ODataQuery, ODataResponse } from './api';
import { MaterialMasterData, NutrientTypesV1 } from '../interfaces/entities';

const MATERIAL_ENDPOINT = '/odata/v4/formulations/MaterialMasterData';
const NUTRIENT_TYPES_ENDPOINT = '/odata/v4/formulations/NutrientTypesV1';

export const materialService = {
  // Get all materials with optional OData query
  async getAll(query?: ODataQuery): Promise<ODataResponse<MaterialMasterData>> {
    const queryString = query ? buildODataQuery(query) : '';
    const url = queryString ? `${MATERIAL_ENDPOINT}?${queryString}` : MATERIAL_ENDPOINT;
    const response = await apiClient.get<ODataResponse<MaterialMasterData>>(url);
    return response.data;
  },

  // Get single material by item number
  async getByItemNumber(itemNumber: string): Promise<MaterialMasterData> {
    const response = await apiClient.get<MaterialMasterData>(
      `${MATERIAL_ENDPOINT}('${itemNumber}')`
    );
    return response.data;
  },

  // Search materials
  async search(searchTerm: string): Promise<MaterialMasterData[]> {
    const filter = `contains(materialDescription,'${searchTerm}') or contains(itemNumber,'${searchTerm}')`;
    const query = buildODataQuery({ $filter: filter });
    const response = await apiClient.get<ODataResponse<MaterialMasterData>>(
      `${MATERIAL_ENDPOINT}?${query}`
    );
    return response.data.value;
  },

  // Get nutrient types for value help
  async getNutrientTypes(): Promise<NutrientTypesV1[]> {
    const response = await apiClient.get<ODataResponse<NutrientTypesV1>>(
      NUTRIENT_TYPES_ENDPOINT
    );
    return response.data.value;
  },

  // Get materials by nutrient type
  async getByNutrientType(nutrientTypeCode: string): Promise<MaterialMasterData[]> {
    const filter = `nutrientTypes_cd eq '${nutrientTypeCode}'`;
    const query = buildODataQuery({ $filter: filter });
    const response = await apiClient.get<ODataResponse<MaterialMasterData>>(
      `${MATERIAL_ENDPOINT}?${query}`
    );
    return response.data.value;
  },
};
