import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/auth/AuthContext';
import { formulationService } from '@/services/formulationService';
import { Formulations } from '@/interfaces/entities';
import { toast } from 'sonner';

const FormulationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { canAccess } = useAuth();
  const [formulation, setFormulation] = useState<Formulations | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const canUpdate = canAccess('formulas.update');

  useEffect(() => {
    if (id) {
      loadFormulation();
    }
  }, [id]);

  const loadFormulation = async () => {
    try {
      setIsLoading(true);
      const data = await formulationService.getById(
        id!,
        'formulationType,to_AssignMaterialToFormula'
      );
      setFormulation(data);
    } catch (error) {
      toast.error('Failed to load formulation details');
      console.error('Error loading formulation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="app-container">
        <AppHeader />
        <main className="page-container">
          <div className="text-center py-12">Loading...</div>
        </main>
      </div>
    );
  }

  if (!formulation) {
    return (
      <div className="app-container">
        <AppHeader />
        <main className="page-container">
          <div className="text-center py-12 text-muted-foreground">
            Formulation not found
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <AppHeader />
      
      <main className="page-container">
        <div className="page-header">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/formulations')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          
          <h1 className="page-header__title">Formulation Details</h1>
          
          <div className="page-header__actions">
            {canUpdate && (
              <Button onClick={() => navigate(`/formulations/${id}/edit`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid--cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Formulation ID</p>
                  <p className="text-base font-semibold">{formulation.formulationId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p className="text-base">{formulation.formulationDescr}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <p className="text-base">{formulation.formulationType?.descr || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Valid From</p>
                  <p className="text-base">
                    {formulation.validfromDT
                      ? new Date(formulation.validfromDT).toLocaleDateString()
                      : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Valid To</p>
                  <p className="text-base">
                    {formulation.validtoDT
                      ? new Date(formulation.validtoDT).toLocaleDateString()
                      : '-'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {formulation.to_AssignMaterialToFormula &&
            formulation.to_AssignMaterialToFormula.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {formulation.to_AssignMaterialToFormula.map((material) => (
                      <div
                        key={material.assignMaterialID}
                        className="flex justify-between items-center p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{material.materialDescription}</p>
                          <p className="text-sm text-muted-foreground">
                            Item: {material.itemNumber}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Weight</p>
                          <p className="font-semibold">{material.weight || 0}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
        </div>
      </main>
    </div>
  );
};

export default FormulationDetail;
