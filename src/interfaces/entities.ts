// TypeScript interfaces generated from CDS model

export interface CodeList {
  code: string;
  name?: string;
  descr?: string;
}

export interface NutrientTypesV1 extends CodeList {}
export interface FormulationTypesV1 extends CodeList {}
export interface LocationsV1 extends CodeList {}
export interface UnitsOfMeasuresV1 extends CodeList {}
export interface CalculationTypesV1 extends CodeList {}
export interface BlendStatusV1 extends CodeList {}
export interface BlendPriorityV1 extends CodeList {}
export interface BlendWorkOrderV1 extends CodeList {}
export interface BatchSplitMethodsV1 extends CodeList {}
export interface DispatchMethodsV1 extends CodeList {}

export interface Assignee {
  bpNumber: number;
  bpName: string;
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
}

export interface Formulations {
  formulationId: string;
  formulationDescr: string;
  formulationType?: FormulationTypesV1;
  formulationType_code?: string;
  validfromDT?: string;
  validtoDT?: string;
  to_AssignMaterialToFormula?: AssignMaterialToFormula[];
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
}

export interface AssignMaterialToFormula {
  assignMaterialID: string;
  to_formulation?: Formulations;
  to_formulation_formulationId?: string;
  itemNumber?: string;
  materialDescription?: string;
  nutrientTypes_cd?: string;
  weight?: number;
  percent_N_Source?: number;
  percent_N2_Source?: number;
  percent_N3_Source?: number;
  percent_N4_Source?: number;
  percent_P_Source?: number;
  percent_P2_Source?: number;
  percent_P3_Source?: number;
  percent_P4_Source?: number;
  percent_K_Source?: number;
  percent_S_Source?: number;
  percent_ES_Source?: number;
  percent_S1_Source?: number;
  percent_B_Source?: number;
  percent_ZN_Source?: number;
  percent_MG_Source?: number;
  percent_MN_Source?: number;
  percent_CU_Source?: number;
  percent_FE_Source?: number;
  percent_C_Source?: number;
  percent_W_Source?: number;
  percent_L_Source?: number;
  percent_F_Source?: number;
  percent_G_Source?: number;
  firstTraceSource?: number;
  secondTraceSource?: number;
  thirdTraceSource?: number;
  fourthTraceSource?: number;
  fifthTraceSource?: number;
  sixthTraceSource?: number;
  firstTraceCode?: string;
  secondTraceCode?: string;
  thirdTraceCode?: string;
  fourthTraceCode?: string;
  fifthTraceCode?: string;
  sixthTraceCode?: string;
  percentOfWaterDecimal?: number;
  percentOfClay?: number;
  traceNotInBlend?: string;
  calculationSequence?: number;
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
}

export interface AssignMaterialToBlend {
  assignMaterialBlendID: string;
  to_FertilizerBlend?: FertilizerBlend;
  to_FertilizerBlend_orderID?: number;
  selectedNutrientsCode?: string;
  selectedItemNumber?: string;
  selectedMaterial?: string;
  gpaForBlend?: number;
  quantityPerAcerForBlend?: number;
  nutrientWeightForBlend?: number;
  totalLBSForBlend?: number;
  itemNumber?: string;
  materialDescription?: string;
  nutrientTypes_cd?: string;
  weight?: number;
  percent_N_Source?: number;
  percent_N2_Source?: number;
  percent_N3_Source?: number;
  percent_N4_Source?: number;
  percent_P_Source?: number;
  percent_P2_Source?: number;
  percent_P3_Source?: number;
  percent_P4_Source?: number;
  percent_K_Source?: number;
  percent_S_Source?: number;
  percent_ES_Source?: number;
  percent_S1_Source?: number;
  percent_B_Source?: number;
  percent_ZN_Source?: number;
  percent_MG_Source?: number;
  percent_MN_Source?: number;
  percent_CU_Source?: number;
  percent_FE_Source?: number;
  percent_C_Source?: number;
  percent_W_Source?: number;
  percent_L_Source?: number;
  percent_F_Source?: number;
  percent_G_Source?: number;
  firstTraceSource?: number;
  secondTraceSource?: number;
  thirdTraceSource?: number;
  fourthTraceSource?: number;
  fifthTraceSource?: number;
  sixthTraceSource?: number;
  firstTraceCode?: string;
  secondTraceCode?: string;
  thirdTraceCode?: string;
  fourthTraceCode?: string;
  fifthTraceCode?: string;
  sixthTraceCode?: string;
  percentOfWaterDecimal?: number;
  percentOfClay?: number;
  traceNotInBlend?: string;
  calculationSequence?: number;
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
}

export interface FertilizerBlend {
  orderID: number;
  blendName?: string;
  blendStartDT?: string;
  blendEndDT?: string;
  acres?: number;
  uom?: UnitsOfMeasuresV1;
  uom_code?: string;
  vrt?: boolean;
  locationForBlend?: LocationsV1;
  locationForBlend_code?: string;
  luquidNutrientsGallonPerAcre?: number;
  nutrientsQuantity?: number;
  totalQuantity?: number;
  nutrientsQuantityLBSPerAcre?: number;
  totalNutrientsQuantityLBSPerAcre?: number;
  nutrientsQuantityGallonPerAcre?: number;
  totalNutrientsQuantityGallonPerAcre?: number;
  nutrientsDensity?: number;
  totalNutrientsDensity?: number;
  to_location?: LocationsV1;
  to_location_code?: string;
  to_blendStatus?: BlendStatusV1;
  to_blendStatus_code?: string;
  to_blendWorkOrder?: BlendWorkOrderV1;
  to_blendWorkOrder_code?: string;
  to_Assignee?: Assignee;
  to_Assignee_bpNumber?: number;
  to_blendPriority?: BlendPriorityV1;
  to_blendPriority_code?: string;
  to_FormulationTypes?: FormulationTypesV1;
  to_FormulationTypes_code?: string;
  to_formulation?: Formulations;
  to_formulation_formulationId?: string;
  to_AssignMaterialToFormula?: AssignMaterialToFormula;
  to_AssignMaterialToFormula_assignMaterialID?: string;
  to_AssignMaterialToBlend?: AssignMaterialToBlend[];
  to_Claculation?: CalculationTypesV1;
  to_Claculation_code?: string;
  nutrient_N_targetValue?: number;
  nutrient_N2_targetValue?: number;
  nutrient_N3_targetValue?: number;
  nutrient_N4_targetValue?: number;
  nutrient_P_targetValue?: number;
  nutrient_P2_targetValue?: number;
  nutrient_P3_targetValue?: number;
  nutrient_P4_targetValue?: number;
  nutrient_K_targetValue?: number;
  nutrient_S_targetValue?: number;
  nutrient_ES_targetValue?: number;
  nutrient_S1_targetValue?: number;
  nutrient_B_targetValue?: number;
  nutrient_ZN_targetValue?: number;
  nutrient_MG_targetValue?: number;
  nutrient_MN_targetValue?: number;
  nutrient_CU_targetValue?: number;
  nutrient_FE_targetValue?: number;
  nutrient_C_targetValue?: number;
  nutrient_W_targetValue?: number;
  nutrient_L_targetValue?: number;
  nutrient_F_targetValue?: number;
  nutrient_G_targetValue?: number;
  to_farms?: Farms;
  to_farms_ID?: string;
  nutrient_N_AnalysisValue?: number;
  nutrient_P_AnalysisValue?: number;
  nutrient_K_AnalysisValue?: number;
  nutrient_B_AnalysisValue?: number;
  nutrient_C_AnalysisValue?: number;
  nutrient_CU_AnalysisValue?: number;
  nutrient_FE_AnalysisValue?: number;
  nutrient_MG_AnalysisValue?: number;
  nutrient_MN_AnalysisValue?: number;
  nutrient_S_AnalysisValue?: number;
  nutrient_ZN_AnalysisValue?: number;
  to_UnitsOfMeasures?: UnitsOfMeasuresV1;
  to_UnitsOfMeasures_code?: string;
  uomForTotalQuantity?: string;
  uomForTotalQuantityPerAcrea?: string;
  isEditable?: boolean;
  to_formulation_formulationIdHidden?: string;
  to_FormulationTypes_codeHidden?: string;
  deliveryDate?: string;
  notes?: string;
  dispatchMethod?: DispatchMethodsV1;
  dispatchMethod_code?: string;
  sizeOfBatch?: number;
  uomOfBatch?: UnitsOfMeasuresV1;
  uomOfBatch_code?: string;
  numberOfBatches?: number;
  splitMethodofBatch?: BatchSplitMethodsV1;
  splitMethodofBatch_code?: string;
  generalComments?: string;
  fertilizerBlendComments?: string;
  sparayWorkOrderComments?: string;
  shippingDocumentComment?: string;
  applicator?: string;
  licenceNumber?: string;
  expirationDate?: string;
  Machine?: string;
  Operator?: string;
  to_DefaultSettings?: DefaultSettings;
  to_DefaultSettings_defaultSettingID?: string;
  salesPersonID?: string;
  salesPersonName?: string;
  salesPersonAddress?: string;
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
}

export interface DefaultSettings {
  defaultSettingID: string;
  classDescription?: string;
  classInternalID?: number;
  to_DefaultBatchSettings?: DefaultBatchSettings[];
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
}

export interface DefaultBatchSettings {
  defaultBatchSettingID: string;
  batchQuantity?: number;
  batchSplitMethod?: BatchSplitMethodsV1;
  batchSplitMethod_code?: string;
  batchSize?: number;
  location?: LocationsV1;
  location_code?: string;
  unitsOfMeasure?: UnitsOfMeasuresV1;
  unitsOfMeasure_code?: string;
  to_DefaultSettings?: DefaultSettings;
  to_DefaultSettings_defaultSettingID?: string;
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
}

export interface Farms {
  ID: string;
  name?: string;
  description?: string;
  to_fields?: Fields[];
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
}

export interface Fields {
  ID: string;
  name?: string;
  description?: string;
  to_location?: LocationsV1;
  to_location_code?: string;
  to_farms?: Farms;
  to_farms_ID?: string;
  to_Area?: Areas;
  to_Area_ID?: string;
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
}

export interface Areas {
  ID: string;
  name?: string;
  description?: string;
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
}

export interface MaterialMasterData {
  itemNumber: string;
  materialDescription?: string;
  to_nutrientTypes?: NutrientTypesV1;
  nutrientTypes_cd?: string;
  weight?: number;
  percent_N_Source?: number;
  percent_N2_Source?: number;
  percent_N3_Source?: number;
  percent_N4_Source?: number;
  percent_P_Source?: number;
  percent_P2_Source?: number;
  percent_P3_Source?: number;
  percent_P4_Source?: number;
  percent_K_Source?: number;
  percent_S_Source?: number;
  percent_ES_Source?: number;
  percent_S1_Source?: number;
  percent_B_Source?: number;
  percent_ZN_Source?: number;
  percent_MG_Source?: number;
  percent_MN_Source?: number;
  percent_CU_Source?: number;
  percent_FE_Source?: number;
  percent_C_Source?: number;
  percent_W_Source?: number;
  percent_L_Source?: number;
  percent_F_Source?: number;
  percent_G_Source?: number;
  firstTraceSource?: number;
  secondTraceSource?: number;
  thirdTraceSource?: number;
  fourthTraceSource?: number;
  fifthTraceSource?: number;
  sixthTraceSource?: number;
  firstTraceCode?: string;
  secondTraceCode?: string;
  thirdTraceCode?: string;
  fourthTraceCode?: string;
  fifthTraceCode?: string;
  sixthTraceCode?: string;
  percentOfWaterDecimal?: number;
  percentOfClay?: number;
  traceNotInBlend?: string;
  calculationSequence?: number;
}

export interface BusinessPartnerData {
  applicator?: string;
  licenceNumber?: string;
  expirationDate?: string;
  Machine?: string;
  Operator?: string;
  Customer?: string;
  Supplier?: string;
  BusinessPartnerCategory?: string;
  BusinessPartnerFullName?: string;
  BusinessPartnerName?: string;
  FirstName?: string;
  MiddleName?: string;
  LastName?: string;
  BusinessPartnerType?: string;
  PersonFullName?: string;
  salesPersonID?: string;
  salesPersonName?: string;
  salesPersonAddress?: string;
}
