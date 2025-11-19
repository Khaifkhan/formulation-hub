import apiClient, { buildODataQuery, ODataQuery, ODataResponse } from './api';
import {
  FertilizerBlend,
  BlendStatusV1,
  BlendPriorityV1,
  Assignee,
} from '../interfaces/entities';

const BLEND_ENDPOINT = '/odata/v4/formulations/FertilizerBlend';
const BLEND_STATUS_ENDPOINT = '/odata/v4/formulations/BlendStatusV1';
const BLEND_PRIORITY_ENDPOINT = '/odata/v4/formulations/BlendPriorityV1';
const ASSIGNEE_ENDPOINT = '/odata/v4/formulations/Assignee';

export const blendService = {
  // Get all blends with optional OData query
  async getAll(query?: ODataQuery): Promise<ODataResponse<FertilizerBlend>> {
    const queryString = query ? buildODataQuery(query) : '';
    const url = queryString ? `${BLEND_ENDPOINT}?${queryString}` : BLEND_ENDPOINT;
    const response = await apiClient.get<ODataResponse<FertilizerBlend>>(url);
    return response.data;
  },

  // Get user's own blends
  async getMyBlends(userId: string): Promise<FertilizerBlend[]> {
    const filter = `createdBy eq '${userId}'`;
    const query = buildODataQuery({ $filter: filter });
    const response = await apiClient.get<ODataResponse<FertilizerBlend>>(
      `${BLEND_ENDPOINT}?${query}`
    );
    return response.data.value;
  },

  // Get single blend by ID with expansion
  async getById(orderID: number, expand?: string): Promise<FertilizerBlend> {
    const query = expand ? `?$expand=${expand}` : '';
    const response = await apiClient.get<FertilizerBlend>(
      `${BLEND_ENDPOINT}(${orderID})${query}`
    );
    return response.data;
  },

  // Create new blend
  async create(data: Partial<FertilizerBlend>): Promise<FertilizerBlend> {
    const response = await apiClient.post<FertilizerBlend>(BLEND_ENDPOINT, data);
    return response.data;
  },

  // Update blend
  async update(orderID: number, data: Partial<FertilizerBlend>): Promise<FertilizerBlend> {
    const response = await apiClient.patch<FertilizerBlend>(
      `${BLEND_ENDPOINT}(${orderID})`,
      data
    );
    return response.data;
  },

  // Delete blend
  async delete(orderID: number): Promise<void> {
    await apiClient.delete(`${BLEND_ENDPOINT}(${orderID})`);
  },

  // Value help endpoints
  async getBlendStatuses(): Promise<BlendStatusV1[]> {
    const response = await apiClient.get<ODataResponse<BlendStatusV1>>(
      BLEND_STATUS_ENDPOINT
    );
    return response.data.value;
  },

  async getBlendPriorities(): Promise<BlendPriorityV1[]> {
    const response = await apiClient.get<ODataResponse<BlendPriorityV1>>(
      BLEND_PRIORITY_ENDPOINT
    );
    return response.data.value;
  },

  async getAssignees(): Promise<Assignee[]> {
    const response = await apiClient.get<ODataResponse<Assignee>>(ASSIGNEE_ENDPOINT);
    return response.data.value;
  },

  // Search blends
  async search(searchTerm: string): Promise<FertilizerBlend[]> {
    const filter = `contains(blendName,'${searchTerm}')`;
    const query = buildODataQuery({ $filter: filter });
    const response = await apiClient.get<ODataResponse<FertilizerBlend>>(
      `${BLEND_ENDPOINT}?${query}`
    );
    return response.data.value;
  },
};
