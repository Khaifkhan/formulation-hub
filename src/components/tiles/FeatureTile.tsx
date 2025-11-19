import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LucideIcon, Lock } from 'lucide-react';
import { Feature } from '@/auth/types';
import { useAuth } from '@/auth/AuthContext';
import styles from '@/scss/components/_tile.module.scss';
import { cn } from '@/lib/utils';

interface FeatureTileProps {
  title: string;
  description: string;
  icon: LucideIcon;
  route: string;
  feature: Feature;
  className?: string;
}

export function FeatureTile({
  title,
  description,
  icon: Icon,
  route,
  feature,
  className,
}: FeatureTileProps) {
  const navigate = useNavigate();
  const { canAccess } = useAuth();
  const hasAccess = canAccess(feature);

  const handleClick = () => {
    if (hasAccess) {
      navigate(route);
    }
  };

  return (
    <div
      className={cn(
        styles.tile,
        !hasAccess && styles['tile--no-access'],
        className
      )}
      onClick={handleClick}
      role="button"
      tabIndex={hasAccess ? 0 : -1}
      onKeyDown={(e) => {
        if (hasAccess && (e.key === 'Enter' || e.key === ' ')) {
          handleClick();
        }
      }}
    >
      <div className={styles.tile__icon}>
        {hasAccess ? <Icon /> : <Lock />}
      </div>
      
      <div className={styles.tile__content}>
        <h3 className={styles.tile__title}>{title}</h3>
        <p className={styles.tile__description}>{description}</p>
      </div>

      <div className={styles.tile__footer}>
        {!hasAccess && (
          <span className={cn(styles.tile__badge, styles['tile__badge--error'])}>
            No Access
          </span>
        )}
        {hasAccess && (
          <span className={cn(styles.tile__badge, styles['tile__badge--success'])}>
            Available
          </span>
        )}
      </div>
    </div>
  );
}
