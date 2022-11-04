package game.model;

import java.util.Objects;

public class Category {
    int categoryId;
    String type;

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Category)) return false;
        Category category = (Category) o;
        return categoryId == category.categoryId && type.equals(category.type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(categoryId, type);
    }
}
