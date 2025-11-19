import apiClient, { buildODataQuery, ODataQuery, ODataResponse } from './api';
import {
  DefaultSettings,
  DefaultBatchSettings,
  LocationsV1,
  UnitsOfMeasuresV1,
  BatchSplitMethodsV1,
} from '../interfaces/entities';

const DEFAULT_SETTINGS_ENDPOINT = '/odata/v4/formulations/DefaultSettings';
const LOCATIONS_ENDPOINT = '/odata/v4/formulations/LocationsV1';
const UOM_ENDPOINT = '/odata/v4/formulations/UnitsOfMeasuresV1';
const BATCH_SPLIT_ENDPOINT = '/odata/v4/formulations/BatchSplitMethodsV1';

export const defaultSettingsService = {
  // Get all default settings with optional OData query
  async getAll(query?: ODataQuery): Promise<ODataResponse<DefaultSettings>> {
    const queryString = query ? buildODataQuery(query) : '';
    const url = queryString
      ? `${DEFAULT_SETTINGS_ENDPOINT}?${queryString}`
      : DEFAULT_SETTINGS_ENDPOINT;
    const response = await apiClient.get<ODataResponse<DefaultSettings>>(url);
    return response.data;
  },

  // Get single default setting by ID with expansion
  async getById(defaultSettingID: string, expand?: string): Promise<DefaultSettings> {
    const query = expand ? `?$expand=${expand}` : '';
    const response = await apiClient.get<DefaultSettings>(
      `${DEFAULT_SETTINGS_ENDPOINT}(${defaultSettingID})${query}`
    );
    return response.data;
  },

  // Create new default setting
  async create(data: Partial<DefaultSettings>): Promise<DefaultSettings> {
    const response = await apiClient.post<DefaultSettings>(
      DEFAULT_SETTINGS_ENDPOINT,
      data
    );
    return response.data;
  },

  // Update default setting
  async update(
    defaultSettingID: string,
    data: Partial<DefaultSettings>
  ): Promise<DefaultSettings> {
    const response = await apiClient.patch<DefaultSettings>(
      `${DEFAULT_SETTINGS_ENDPOINT}(${defaultSettingID})`,
      data
    );
    return response.data;
  },

  // Delete default setting
  async delete(defaultSettingID: string): Promise<void> {
    await apiClient.delete(`${DEFAULT_SETTINGS_ENDPOINT}(${defaultSettingID})`);
  },

  // Batch settings operations
  async createBatchSetting(
    data: Partial<DefaultBatchSettings>
  ): Promise<DefaultBatchSettings> {
    const response = await apiClient.post<DefaultBatchSettings>(
      `${DEFAULT_SETTINGS_ENDPOINT}/DefaultBatchSettings`,
      data
    );
    return response.data;
  },

  async updateBatchSetting(
    defaultBatchSettingID: string,
    data: Partial<DefaultBatchSettings>
  ): Promise<DefaultBatchSettings> {
    const response = await apiClient.patch<DefaultBatchSettings>(
      `${DEFAULT_SETTINGS_ENDPOINT}/DefaultBatchSettings(${defaultBatchSettingID})`,
      data
    );
    return response.data;
  },

  async deleteBatchSetting(defaultBatchSettingID: string): Promise<void> {
    await apiClient.delete(
      `${DEFAULT_SETTINGS_ENDPOINT}/DefaultBatchSettings(${defaultBatchSettingID})`
    );
  },

  // Value help endpoints
  async getLocations(): Promise<LocationsV1[]> {
    const response = await apiClient.get<ODataResponse<LocationsV1>>(LOCATIONS_ENDPOINT);
    return response.data.value;
  },

  async getUnitsOfMeasure(): Promise<UnitsOfMeasuresV1[]> {
    const response = await apiClient.get<ODataResponse<UnitsOfMeasuresV1>>(UOM_ENDPOINT);
    return response.data.value;
  },

  async getBatchSplitMethods(): Promise<BatchSplitMethodsV1[]> {
    const response = await apiClient.get<ODataResponse<BatchSplitMethodsV1>>(
      BATCH_SPLIT_ENDPOINT
    );
    return response.data.value;
  },
};
