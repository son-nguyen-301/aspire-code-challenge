<template>
    <q-dialog
        :model-value="modelValue"
        position="bottom"
        class
        no-esc-dismiss
        no-backdrop-dismiss
        no-shake
        @update:model-value="toggleDialog($event)"
    >
        <div class="add-new-card-dialog">
            <div class="add-new-card-dialog__title">Add Card</div>
            <CloseIcon class="add-new-card-dialog__close-icon" @click="toggleDialog(false)" />
            <card
                new-card
                class="add-new-card-dialog__card"
                :card-holder="cardHolder || undefined"
                :card-number="cardNumber || undefined"
                :cvv="cvv || undefined"
                :expiry-date="expiryDate || undefined"
            />
            <q-form
                class="add-new-card-dialog__form row q-col-gutter-sm"
                autofocus
                @submit="addCard"
            >
                <div class="col-12">
                    <q-input
                        v-model="cardHolder"
                        outlined
                        label="Cardholder name"
                        autocapitalize="words"
                        :rules="cardHolderRules"
                    />
                </div>
                <div class="col-12">
                    <q-input
                        v-model="cardNumber"
                        outlined
                        label="Card number"
                        inputmode="numeric"
                        mask="#### #### #### ####"
                        :rules="cardNumberRules"
                    />
                </div>
                <div class="col-6">
                    <q-input
                        v-model="expiryDate"
                        outlined
                        label="Valid thru"
                        inputmode="numeric"
                        mask="##/##"
                        :rules="expiryDateRules"
                    />
                </div>
                <div class="col-6">
                    <q-input
                        v-model="cvv"
                        outlined
                        label="Security code (CVV)"
                        inputmode="numeric"
                        mask="###"
                        :rules="cvvRules"
                    />
                </div>
                <div class="col-12 q-mt-md">
                    <q-btn
                        color="primary"
                        class="add-new-card-dialog__form__submit-btn"
                        type="submit"
                        unelevated
                        size="md"
                    >Add now</q-btn>
                </div>
            </q-form>
        </div>
    </q-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import CloseIcon from '~/assets/svg/close.svg?component'
import validateCard from 'card-validator'
import Card from './Card.vue';
import { useCardApis } from 'src/api/cards';
import { Notify } from 'quasar';
import { useMyCardsStore } from 'src/stores/my-cards';
defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits<{
    (event: 'update:model-value', value: boolean): void
}>()
const { addNewCard } = useCardApis()
const { setCards } = useMyCardsStore()
const cardNumber = ref('')
const cardHolder = ref('')
const expiryDate = ref('')
const cvv = ref('')

const expiryMonth = computed(() => expiryDate.value.slice(0, 2))
const expiryYear = computed(() => expiryDate.value.slice(3))

const cardHolderRules = [(value: string) => validateCard.cardholderName(value).isValid || 'Invalid cardholder name']
const cardNumberRules = [(value: string) => validateCard.number(value).isValid || validateCard.number(value).isValid || 'Invalid card number']
const expiryDateRules = [() => Number(expiryMonth.value) && Number(expiryMonth.value) <= 12 || validateCard.expirationYear(expiryYear.value).isValid || 'Invalid expiration date']
const cvvRules = [(value: string) => validateCard.cvv(value).isValid || 'Invalid CVV']

const toggleDialog = (value: boolean) => {
    emit('update:model-value', value)
}

const addCard = async () => {
    const result = await addNewCard({
        id: cardNumber.value,
        cardHolder: cardHolder.value,
        cardNumber: cardNumber.value,
        cvv: cvv.value,
        expiryDate: expiryDate.value,
        status: 'active',
        spendLimit: 1000000
    })

    if (result === 'This card has already been added') {
        Notify.create({
            message: result,
            type: 'info',
        })
    } else {
        setCards(result)
        toggleDialog(false)
        Notify.create({
            message: 'Your card has been added',
            type: 'positive',
        })
    }
}

</script>

<style lang="scss">
.add-new-card-dialog {
    @apply rounded-t-3xl #{!important};
    @apply bg-white p-6 relative;
    &__title {
        @apply text-center prose-16 font-medium mb-6;
    }
    &__close-icon {
        @apply absolute top-3 right-3 cursor-pointer;
    }
    &__card {
        @apply max-w-358px mx-auto mb-6;
    }
    &__form {
        &__submit-btn {
            @apply w-full py-2 font-bold #{!important};
        }
    }
}
</style>
