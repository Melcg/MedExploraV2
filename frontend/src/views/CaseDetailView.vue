<template>
  <div class="case-detail-view">
    <AppBar />
    
    <v-main class="main-content">
      <v-container v-if="clinicalCase">
        <!-- Header -->
        <div class="mb-6">
          <v-btn
            variant="text"
            prepend-icon="mdi-arrow-left"
            class="mb-4"
            @click="goBack"
          >
            Volver a casos
          </v-btn>
          
          <div class="d-flex align-center mb-2">
            <h1 class="text-h4 mr-3">{{ clinicalCase.title }}</h1>
            <v-chip
              :color="getDifficultyColor(clinicalCase.difficulty)"
              prepend-icon="mdi-chart-line"
            >
              {{ getDifficultyLabel(clinicalCase.difficulty) }}
            </v-chip>
          </div>
          <p class="text-body-1 text-medium-emphasis">
            {{ clinicalCase.description }}
          </p>
        </div>

        <!-- Progreso -->
        <v-progress-linear
          :model-value="progress"
          color="primary"
          height="8"
          rounded
          class="mb-6"
        />

        <!-- Caso clínico en pasos -->
        <v-window v-model="currentStep" class="mb-6">
          <!-- Paso 1: Información del caso -->
          <v-window-item :value="0">
            <v-card elevation="2">
              <v-card-title>Información del Caso</v-card-title>
              <v-divider />
              <v-card-text>
                <!-- Paciente -->
                <h3 class="text-h6 mb-3">Datos del Paciente</h3>
                <v-list density="compact">
                  <v-list-item>
                    <strong>Nombre:</strong> {{ clinicalCase.patient.name }}
                  </v-list-item>
                  <v-list-item>
                    <strong>Edad:</strong> {{ clinicalCase.patient.age }} años
                  </v-list-item>
                  <v-list-item>
                    <strong>Género:</strong> {{ clinicalCase.patient.gender }}
                  </v-list-item>
                  <v-list-item>
                    <strong>Motivo de consulta:</strong> {{ clinicalCase.patient.chiefComplaint }}
                  </v-list-item>
                </v-list>

                <!-- Historia -->
                <h3 class="text-h6 mt-6 mb-3">Historia Clínica</h3>
                <div class="mb-3">
                  <strong>Padecimiento Actual:</strong>
                  <p>{{ clinicalCase.history.present }}</p>
                </div>
                <div class="mb-3">
                  <strong>Antecedentes:</strong>
                  <p>{{ clinicalCase.history.past }}</p>
                </div>

                <!-- Signos vitales -->
                <h3 class="text-h6 mt-6 mb-3">Signos Vitales</h3>
                <v-row>
                  <v-col v-for="(value, key) in clinicalCase.vitalSigns" :key="key" cols="6" sm="4">
                    <v-card variant="tonal">
                      <v-card-text class="text-center">
                        <div class="text-caption text-medium-emphasis">{{ formatVitalSign(key) }}</div>
                        <div class="text-h6 font-weight-bold">{{ value }}</div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-window-item>

          <!-- Pasos de exploración -->
          <v-window-item
            v-for="(step, index) in clinicalCase.physicalExam.steps"
            :key="step.id"
            :value="index + 1"
          >
            <v-card elevation="2">
              <v-card-title>
                Paso {{ index + 1 }}: {{ step.instruction }}
              </v-card-title>
              <v-divider />
              <v-card-text>
                <p class="text-body-1 mb-4">
                  <strong>Instrucción:</strong> {{ step.instruction }}
                </p>

                <h4 class="text-subtitle-1 mb-3">Selecciona el hallazgo correcto:</h4>

                <v-radio-group v-model="selectedFindings[step.id]">
                  <v-radio
                    v-for="finding in step.findings"
                    :key="finding.id"
                    :value="finding.id"
                    :label="finding.text"
                    :color="getAnswerColor(step.id, finding)"
                  />
                </v-radio-group>

                <!-- Feedback -->
                <v-alert
                  v-if="stepAnswered[step.id]"
                  :type="stepCorrect[step.id] ? 'success' : 'error'"
                  variant="tonal"
                  class="mt-4"
                >
                  <v-alert-title>
                    {{ stepCorrect[step.id] ? '¡Correcto!' : 'Incorrecto' }}
                  </v-alert-title>
                  <div>
                    <strong>Hallazgo correcto:</strong> {{ step.correctFinding }}
                  </div>
                  <div v-if="stepCorrect[step.id]" class="mt-2">
                    +{{ getCurrentPoints(step) }} puntos
                  </div>
                </v-alert>
              </v-card-text>
            </v-card>
          </v-window-item>

          <!-- Diagnóstico -->
          <v-window-item :value="clinicalCase.physicalExam.steps.length + 1">
            <v-card elevation="2">
              <v-card-title>Diagnóstico y Puntos de Aprendizaje</v-card-title>
              <v-divider />
              <v-card-text>
                <!-- Puntaje final -->
                <v-alert type="info" variant="tonal" class="mb-4">
                  <v-alert-title>Puntaje Final</v-alert-title>
                  <div class="text-h4 mt-2">{{ currentScore }} puntos</div>
                </v-alert>

                <!-- Diagnóstico -->
                <h3 class="text-h6 mb-3">Diagnóstico más probable</h3>
                <v-alert type="success" variant="tonal" class="mb-4">
                  {{ clinicalCase.diagnosis.most_likely }}
                </v-alert>

                <p class="mb-4">{{ clinicalCase.diagnosis.explanation }}</p>

                <!-- Diagnósticos diferenciales -->
                <h4 class="text-subtitle-1 mb-2">Diagnósticos diferenciales:</h4>
                <v-chip-group column class="mb-4">
                  <v-chip
                    v-for="diff in clinicalCase.diagnosis.differential"
                    :key="diff"
                    variant="outlined"
                  >
                    {{ diff }}
                  </v-chip>
                </v-chip-group>

                <!-- Puntos de aprendizaje -->
                <h3 class="text-h6 mb-3">Puntos de Aprendizaje</h3>
                <v-list>
                  <v-list-item
                    v-for="(point, index) in clinicalCase.learning_points"
                    :key="index"
                    prepend-icon="mdi-lightbulb"
                  >
                    {{ point }}
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>

        <!-- Navegación -->
        <div class="d-flex justify-space-between mt-6">
          <v-btn
            :disabled="currentStep === 0"
            prepend-icon="mdi-chevron-left"
            @click="previousStep"
          >
            Anterior
          </v-btn>

          <v-btn
            v-if="currentStep < totalSteps - 1"
            :disabled="!canProceed"
            append-icon="mdi-chevron-right"
            color="primary"
            @click="nextStep"
          >
            Siguiente
          </v-btn>

          <v-btn
            v-else
            color="success"
            prepend-icon="mdi-check"
            @click="finishCase"
          >
            Finalizar
          </v-btn>
        </div>
      </v-container>
    </v-main>

    <BottomNavigation />

    <!-- Dialog de finalización -->
    <v-dialog v-model="showFinishDialog" max-width="500" persistent>
      <v-card>
        <v-card-title>
          <v-icon icon="mdi-trophy" color="amber" class="mr-2" />
          ¡Caso Completado!
        </v-card-title>
        <v-divider />
        <v-card-text class="text-center pa-6">
          <v-avatar color="amber" size="100" class="mb-4">
            <span class="text-h3">{{ currentScore }}</span>
          </v-avatar>
          <h3 class="text-h5 mb-2">Puntos obtenidos</h3>
          <p class="text-body-1">
            Has completado el caso clínico "{{ clinicalCase?.title }}"
          </p>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn variant="text" @click="goBack">
            Volver a casos
          </v-btn>
          <v-spacer />
          <v-btn color="primary" @click="restartCase">
            Reintentar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppBar from '@/components/layout/AppBar.vue'
import BottomNavigation from '@/components/layout/BottomNavigation.vue'
import { getCaseById } from '@/data/clinicalCases'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  caseId: {
    type: String,
    required: true
  }
})

const clinicalCase = ref(null)
const currentStep = ref(0)
const selectedFindings = ref({})
const stepAnswered = ref({})
const stepCorrect = ref({})
const currentScore = ref(0)
const showFinishDialog = ref(false)

const totalSteps = computed(() => {
  if (!clinicalCase.value) return 0
  return clinicalCase.value.physicalExam.steps.length + 2 // info + pasos + diagnóstico
})

const progress = computed(() => {
  return (currentStep.value / (totalSteps.value - 1)) * 100
})

const canProceed = computed(() => {
  if (currentStep.value === 0) return true // Información inicial
  if (currentStep.value > clinicalCase.value.physicalExam.steps.length) return true // Diagnóstico

  const step = clinicalCase.value.physicalExam.steps[currentStep.value - 1]
  return stepAnswered.value[step.id] === true
})

const getDifficultyColor = (difficulty) => {
  const colors = {
    basic: 'success',
    intermediate: 'warning',
    advanced: 'error'
  }
  return colors[difficulty] || 'grey'
}

const getDifficultyLabel = (difficulty) => {
  const labels = {
    basic: 'Básico',
    intermediate: 'Intermedio',
    advanced: 'Avanzado'
  }
  return labels[difficulty] || difficulty
}

const formatVitalSign = (key) => {
  const labels = {
    temperature: 'Temperatura',
    heartRate: 'FC',
    bloodPressure: 'PA',
    respiratoryRate: 'FR',
    oxygenSaturation: 'SpO2'
  }
  return labels[key] || key
}

const getAnswerColor = (stepId, finding) => {
  if (!stepAnswered.value[stepId]) return undefined
  if (selectedFindings.value[stepId] === finding.id) {
    return finding.correct ? 'success' : 'error'
  }
  return undefined
}

const getCurrentPoints = (step) => {
  const selectedId = selectedFindings.value[step.id]
  const finding = step.findings.find(f => f.id === selectedId)
  return finding?.points || 0
}

const nextStep = () => {
  // Verificar respuesta si estamos en un paso de exploración
  if (currentStep.value > 0 && currentStep.value <= clinicalCase.value.physicalExam.steps.length) {
    const step = clinicalCase.value.physicalExam.steps[currentStep.value - 1]
    
    if (!stepAnswered.value[step.id]) {
      const selectedId = selectedFindings.value[step.id]
      const finding = step.findings.find(f => f.id === selectedId)
      
      stepAnswered.value[step.id] = true
      stepCorrect.value[step.id] = finding.correct
      
      if (finding.correct) {
        currentScore.value += finding.points
      }
      
      // Esperar 1 segundo para mostrar feedback antes de continuar
      setTimeout(() => {
        currentStep.value++
      }, 1000)
      return
    }
  }
  
  currentStep.value++
}

const previousStep = () => {
  currentStep.value--
}

const finishCase = () => {
  showFinishDialog.value = true
}

const restartCase = () => {
  currentStep.value = 0
  selectedFindings.value = {}
  stepAnswered.value = {}
  stepCorrect.value = {}
  currentScore.value = 0
  showFinishDialog.value = false
}

const goBack = () => {
  router.push({ name: 'ClinicalCases' })
}

onMounted(() => {
  clinicalCase.value = getCaseById(props.caseId)
  
  if (!clinicalCase.value) {
    console.error('Caso no encontrado:', props.caseId)
    router.push({ name: 'ClinicalCases' })
  }
})
</script>

<style scoped>
.case-detail-view {
  min-height: 100vh;
  background: #f5f5f5;
}

.main-content {
  padding-top: 80px;
  padding-bottom: 80px;
  min-height: calc(100vh - 64px);
}

@media (max-width: 960px) {
  .main-content {
    padding-bottom: 100px;
  }
}
</style>