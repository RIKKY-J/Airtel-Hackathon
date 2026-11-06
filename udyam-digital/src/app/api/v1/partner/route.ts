import { NextResponse } from 'next/server';
import { PartnerService } from '@/modules/handoff/partnerService';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get('limit') || '15', 10);

  const stalledLeads = PartnerService.getStalledLeads(limit);
  const handoffTasks = PartnerService.getHandoffTasks();

  return NextResponse.json({
    success: true,
    stalled_leads: stalledLeads,
    handoff_tasks: handoffTasks
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { task_id, partner_id, notes } = body;

    if (!task_id || !partner_id) {
      return NextResponse.json({ success: false, error: 'task_id and partner_id required' }, { status: 400 });
    }

    PartnerService.resolveTask(task_id, partner_id, notes);
    return NextResponse.json({ success: true, message: 'Task resolved with partner attribution' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

