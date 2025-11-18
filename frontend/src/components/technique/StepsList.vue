<template>
  <v-expansion-panels
    v-model="panel"
    class="steps-list"
  >
    <v-expansion-panel
      v-for="(step, index) in steps"
      :key="index"
      :value="index"
    >
      <v-expansion-panel-title>
        <div class="d-flex align-center">
          <v-avatar
            :color="completed[index] ? 'success' : 'primary'"
            size="32"
            class="mr-3"
          >
            <v-icon v-if="completed[index]" icon="mdi-check" size="small" />
            <span v-else class="text-caption">{{ index + 1 }}</span>
          </v-avatar>
          <span :class="{ 'text-decoration-line-through': completed[index] }">
            Paso {{ index + 1 }}
          </span>
        </div>
      </v-expansion-panel-title>
      
      <v-expansion-panel-text>
        <p class="text-body-1 mb-4">{{ step }}</p>
        
        <div class="d-flex justify-end">
          <v-btn
            v-if="!completed[index]"
            color="success"
            variant="tonal"
            size="small"
            prepend-icon="mdi-check"
            @click="markAsCompleted(index)"
          >
            Marcar como completado
          </v-btn>
          <v-btn
            v-else
            color="grey"
            variant="text"
            size="small"
            prepend-icon="mdi-undo"
            @click="markAsIncomplete(index)"
          >
            Desmarcar
          </v-btn>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  steps: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['progress-update'])

const panel = ref(0)
const completed = ref(Array(props.steps.length).fill(false))

const markAsCompleted = (index) => {
  completed.value[index] = true
  
  // Auto-expandir el siguiente paso
  if (index < props.steps.length - 1) {
    panel.value = index + 1
  }
  
  emitProgress()
}

const markAsIncomplete = (index) => {
  completed.value[index] = false
  emitProgress()
}

const emitProgress = () => {
  const completedCount = completed.value.filter(Boolean).length
  const progress = (completedCount / props.steps.length) * 100
  
  emit('progress-update', {
    completed: completedCount,
    total: props.steps.length,
    percentage: Math.round(progress)
  })
}
</script>

<style scoped>
.steps-list {
  border-radius: 8px;
  overflow: hidden;
}
</style>