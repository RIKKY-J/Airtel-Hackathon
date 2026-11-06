import { queryAll, queryOne, execute } from '@/infrastructure/db/client';

export interface StalledLeadItem {
  lead_id: string;
  business_name: string;
  business_type: string;
  city: string;
  contact_name: string;
  stage_reached: string;
  drop_reason: string;
  acquisition_cost_inr: number;
}

export interface HandoffTaskItem {
  id: string;
  business_id: string;
  business_name: string;
  business_type: string;
  city: string;
  stage_stalled: string;
  reason: string;
  status: string;
  created_at: string;
}

export class PartnerService {
  /**
   * Retrieves stalled leads from smb_leads.csv (44% quote-drop and field exceptions)
   */
  static getStalledLeads(limit: number = 20): StalledLeadItem[] {
    return queryAll<StalledLeadItem>(`
      SELECT lead_id, business_name, business_type, city, contact_name, stage_reached, drop_reason, acquisition_cost_inr
      FROM smb_leads
      WHERE outcome = 'Dropped' AND drop_reason IS NOT NULL
      ORDER BY rowid ASC
      LIMIT ?
    `, [limit]);
  }

  /**
   * Retrieves active KYC review exceptions and human intervention tasks
   */
  static getHandoffTasks(): HandoffTaskItem[] {
    return queryAll<HandoffTaskItem>(`
      SELECT ht.id, ht.business_id, b.business_name, b.business_type, b.city, ht.stage_stalled, ht.reason, ht.status, ht.created_at
      FROM handoff_tasks ht
      JOIN businesses b ON ht.business_id = b.id
      ORDER BY ht.created_at DESC
    `);
  }

  /**
   * Resolves a handoff task with partner attribution
   */
  static resolveTask(taskId: string, partnerId: string, notes?: string): boolean {
    execute(
      `UPDATE handoff_tasks SET status = 'resolved', partner_id = ? WHERE id = ?`,
      [partnerId, taskId]
    );
    return true;
  }
}

