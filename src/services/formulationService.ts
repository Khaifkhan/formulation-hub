import apiClient, { buildODataQuery, ODataQuery, ODataResponse } from './api';
import { Formulations, FormulationTypesV1 } from '../interfaces/entities';

const FORMULATION_ENDPOINT = '/odata/v4/formulations/Formulations';
const FORMULATION_TYPES_ENDPOINT = '/odata/v4/formulations/FormulationTypesV1';

export const formulationService = {
  // Get all formulations with optional OData query
  async getAll(query?: ODataQuery): Promise<ODataResponse<Formulations>> {
    const queryString = query ? buildODataQuery(query) : '';
    const url = queryString ? `${FORMULATION_ENDPOINT}?${queryString}` : FORMULATION_ENDPOINT;
    const response = await apiClient.get<ODataResponse<Formulations>>(url);
    return response.data;
  },

  // Get single formulation by ID with expansion
  async getById(formulationId: string, expand?: string): Promise<Formulations> {
    const query = expand ? `?$expand=${expand}` : '';
    const response = await apiClient.get<Formulations>(
      `${FORMULATION_ENDPOINT}('${formulationId}')${query}`
    );
    return response.data;
  },

  // Create new formulation
  async create(data: Partial<Formulations>): Promise<Formulations> {
    const response = await apiClient.post<Formulations>(FORMULATION_ENDPOINT, data);
    return response.data;
  },

  // Update formulation
  async update(formulationId: string, data: Partial<Formulations>): Promise<Formulations> {
    const response = await apiClient.patch<Formulations>(
      `${FORMULATION_ENDPOINT}('${formulationId}')`,
      data
    );
    return response.data;
  },

  // Delete (retire) formulation
  async delete(formulationId: string): Promise<void> {
    await apiClient.delete(`${FORMULATION_ENDPOINT}('${formulationId}')`);
  },

  // Get formulation types for value help
  async getFormulationTypes(): Promise<FormulationTypesV1[]> {
    const response = await apiClient.get<ODataResponse<FormulationTypesV1>>(
      FORMULATION_TYPES_ENDPOINT
    );
    return response.data.value;
  },

  // Search formulations
  async search(searchTerm: string): Promise<Formulations[]> {
    const filter = `contains(formulationDescr,'${searchTerm}') or contains(formulationId,'${searchTerm}')`;
    const query = buildODataQuery({ $filter: filter });
    const response = await apiClient.get<ODataResponse<Formulations>>(
      `${FORMULATION_ENDPOINT}?${query}`
    );
    return response.data.value;
  },
};
