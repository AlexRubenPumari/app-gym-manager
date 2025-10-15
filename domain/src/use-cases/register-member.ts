import { NewEntity } from "../utils"
import { Member } from "../entities"
import { MemberService } from "../services"

interface RegisterMemberDeps {
  memberService: MemberService
}

interface RegisterMemberPayload {
  newMember: NewEntity<Member>,
}

export async function registerMember (
  dependencies: RegisterMemberDeps, payload: RegisterMemberPayload
) {
  if (!payload?.newMember) return new Error()

  const result = await dependencies.memberService.register(payload.newMember)

  return result
}

// updateMember → actualizar datos de un miembro (plan, estado, datos personales).
// deleteMember → eliminar o desactivar un miembro.

// listMembers → obtener todos los miembros o filtrados (por plan, estado, fecha de inscripción, etc.).

// Gestión de planes y pagos

// createPlan → crear un plan de membresía.

// updatePlan → actualizar un plan existente.

// deletePlan → eliminar un plan.

// assignPlanToMember → asignar un plan a un miembro.

// recordPayment → registrar un pago de un miembro.

// getPaymentHistory → ver historial de pagos de un miembro.

// Gestión de clases y entrenadores

// createClass → crear clases grupales o sesiones.

// updateClass → modificar horarios o capacidad de clase.

// deleteClass → eliminar una clase.

// assignTrainerToClass → asignar un entrenador.

// getClassSchedule → ver horario de clases.