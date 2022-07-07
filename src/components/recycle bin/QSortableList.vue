<script setup>
    import { ContainerMixin, ElementMixin } from 'vue-slicksort'

    var QSortableList = {
        mixins: [ContainerMixin],
        template: `
            <q-list class="">
            <slot />
            </q-list>
        `,
    }

    var QSortableItem = {
        mixins: [ElementMixin],
        props: ['item'],
        template: `
            <q-item>{{item}}</q-item>
        `,
    }

    export { QSortableList, QSortableItem }
</script>