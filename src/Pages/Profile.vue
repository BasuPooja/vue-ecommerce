<template>
  <div class="max-w-xl mx-auto p-8">
    <h1 class="text-3xl font-bold mb-6">My Profile</h1>

    <div class="border rounded p-6 space-y-4">
      <!-- Username -->
      <div>
        <label class="font-medium block mb-1">Username</label>
        <input
          v-model="form.username"
          :disabled="!canEdit"
          class="w-full border px-4 py-2 rounded"
        />
      </div>

      <!-- Role -->
      <div>
        <label class="font-medium block mb-1">Role</label>
        <input
          :value="user.role"
          disabled
          class="w-full border px-4 py-2 rounded bg-gray-100"
        />
      </div>

      <!-- Buttons -->
      <div v-if="canEdit" class="flex gap-4 pt-4">
        <button
          @click="saveProfile"
          class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>

        <button
          @click="resetForm"
          class="border px-6 py-2 rounded"
        >
          Cancel
        </button>
      </div>

      <p v-else class="text-gray-500 text-sm">
        You can view your profile but cannot edit it.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: ""
      }
    };
  },

  computed: {
    user() {
      return this.$store.state.auth.user;
    },

    canEdit() {
      // Only logged-in user can edit their own profile
      return !!this.user;
    }
  },

  mounted() {
    this.form.username = this.user.username;
  },

  methods: {
    saveProfile() {
      this.$store.commit("UPDATE_PROFILE", {
        username: this.form.username
      });

      alert("Profile updated successfully");
    },

    resetForm() {
      this.form.username = this.user.username;
      this.$router.push("/");
    }
  }
};
</script>
