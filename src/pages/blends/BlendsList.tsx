import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Eye, Edit } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/auth/AuthContext';
import { blendService } from '@/services/blendService';
import { FertilizerBlend } from '@/interfaces/entities';
import { toast } from 'sonner';
import '@/scss/main.scss';

const BlendsList = () => {
  const navigate = useNavigate();
  const { canAccess, user } = useAuth();
  const [allBlends, setAllBlends] = useState<FertilizerBlend[]>([]);
  const [myBlends, setMyBlends] = useState<FertilizerBlend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const canViewAll = canAccess('blend-tickets.view-all');
  const canCreate = canAccess('blend-tickets.create');

  useEffect(() => {
    loadBlends();
  }, []);

  const loadBlends = async () => {
    try {
      setIsLoading(true);
      
      if (canViewAll) {
        const response = await blendService.getAll({
          $expand: 'to_blendStatus,to_formulation,to_location',
          $orderby: 'modifiedAt desc',
        });
        setAllBlends(response.value);
      }

      if (user?.id) {
        const myBlendsData = await blendService.getMyBlends(user.id);
        setMyBlends(myBlendsData);
      }
    } catch (error) {
      toast.error('Failed to load blend tickets');
      console.error('Error loading blends:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadBlends();
      return;
    }

    try {
      setIsLoading(true);
      const results = await blendService.search(searchTerm);
      if (canViewAll) {
        setAllBlends(results);
      }
      setMyBlends(results.filter((b) => b.createdBy === user?.id));
    } catch (error) {
      toast.error('Search failed');
      console.error('Error searching blends:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderBlendTable = (blends: FertilizerBlend[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Blend Name</TableHead>
          <TableHead>Formulation</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8">
              Loading...
            </TableCell>
          </TableRow>
        ) : blends.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
              No blend tickets found
            </TableCell>
          </TableRow>
        ) : (
          blends.map((blend) => (
            <TableRow key={blend.orderID}>
              <TableCell className="font-medium">{blend.orderID}</TableCell>
              <TableCell>{blend.blendName || '-'}</TableCell>
              <TableCell>
                {blend.to_formulation?.formulationDescr || '-'}
              </TableCell>
              <TableCell>{blend.to_location?.descr || '-'}</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-primary/10 text-primary">
                  {blend.to_blendStatus?.descr || 'Pending'}
                </span>
              </TableCell>
              <TableCell>
                {blend.blendStartDT
                  ? new Date(blend.blendStartDT).toLocaleDateString()
                  : '-'}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/blends/${blend.orderID}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/blends/${blend.orderID}/edit`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className="app-container">
      <AppHeader />
      
      <main className="page-container">
        <div className="page-header">
          <h1 className="page-header__title">Blend Tickets</h1>
          <p className="page-header__subtitle">
            Create and manage fertilizer blend orders
          </p>
          
          <div className="page-header__actions">
            <div className="flex gap-2 flex-1 max-w-md">
              <Input
                placeholder="Search blend tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button variant="outline" onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            {canCreate && (
              <Button onClick={() => navigate('/blends/new')}>
                <Plus className="mr-2 h-4 w-4" />
                Create Blend Ticket
              </Button>
            )}
          </div>
        </div>

        <Card>
          <Tabs defaultValue="my-blends">
            <div className="border-b px-6 pt-6">
              <TabsList>
                <TabsTrigger value="my-blends">My Blend Tickets</TabsTrigger>
                {canViewAll && (
                  <TabsTrigger value="all-blends">All Blend Tickets</TabsTrigger>
                )}
              </TabsList>
            </div>

            <TabsContent value="my-blends" className="m-0">
              {renderBlendTable(myBlends)}
            </TabsContent>

            {canViewAll && (
              <TabsContent value="all-blends" className="m-0">
                {renderBlendTable(allBlends)}
              </TabsContent>
            )}
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

export default BlendsList;
