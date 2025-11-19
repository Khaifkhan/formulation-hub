import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/auth/AuthContext';
import { formulationService } from '@/services/formulationService';
import { Formulations } from '@/interfaces/entities';
import { toast } from 'sonner';
import '@/scss/main.scss';

const FormulationsList = () => {
  const navigate = useNavigate();
  const { canAccess } = useAuth();
  const [formulations, setFormulations] = useState<Formulations[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const canCreate = canAccess('formulas.create');
  const canUpdate = canAccess('formulas.update');
  const canRetire = canAccess('formulas.retire');

  useEffect(() => {
    loadFormulations();
  }, []);

  const loadFormulations = async () => {
    try {
      setIsLoading(true);
      const response = await formulationService.getAll({
        $expand: 'formulationType',
        $orderby: 'modifiedAt desc',
      });
      setFormulations(response.value);
    } catch (error) {
      toast.error('Failed to load formulations');
      console.error('Error loading formulations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadFormulations();
      return;
    }

    try {
      setIsLoading(true);
      const results = await formulationService.search(searchTerm);
      setFormulations(results);
    } catch (error) {
      toast.error('Search failed');
      console.error('Error searching formulations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (formulationId: string) => {
    if (!canRetire) return;

    if (confirm('Are you sure you want to retire this formulation?')) {
      try {
        await formulationService.delete(formulationId);
        toast.success('Formulation retired successfully');
        loadFormulations();
      } catch (error) {
        toast.error('Failed to retire formulation');
        console.error('Error deleting formulation:', error);
      }
    }
  };

  return (
    <div className="app-container">
      <AppHeader />
      
      <main className="page-container">
        <div className="page-header">
          <h1 className="page-header__title">Formulations</h1>
          <p className="page-header__subtitle">
            Manage fertilizer formulations and material assignments
          </p>
          
          <div className="page-header__actions">
            <div className="flex gap-2 flex-1 max-w-md">
              <Input
                placeholder="Search formulations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button variant="outline" onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            {canCreate && (
              <Button onClick={() => navigate('/formulations/new')}>
                <Plus className="mr-2 h-4 w-4" />
                Create Formula
              </Button>
            )}
          </div>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Formulation ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Valid From</TableHead>
                <TableHead>Valid To</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : formulations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No formulations found
                  </TableCell>
                </TableRow>
              ) : (
                formulations.map((formula) => (
                  <TableRow key={formula.formulationId}>
                    <TableCell className="font-medium">{formula.formulationId}</TableCell>
                    <TableCell>{formula.formulationDescr}</TableCell>
                    <TableCell>{formula.formulationType?.descr || '-'}</TableCell>
                    <TableCell>
                      {formula.validfromDT
                        ? new Date(formula.validfromDT).toLocaleDateString()
                        : '-'}
                    </TableCell>
                    <TableCell>
                      {formula.validtoDT
                        ? new Date(formula.validtoDT).toLocaleDateString()
                        : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/formulations/${formula.formulationId}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {canUpdate && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/formulations/${formula.formulationId}/edit`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {canRetire && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(formula.formulationId)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
};

export default FormulationsList;
