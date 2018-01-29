package com.sd.thcs.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.sd.thcs.domain.enumeration.Active;

/**
 * A School.
 */
@Entity
@Table(name = "school")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class School implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "school_nam", nullable = false)
    private String schoolNam;

    @NotNull
    @Column(name = "school_address", nullable = false)
    private String schoolAddress;

    @NotNull
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "is_active", nullable = false)
    private Active isActive;

    @OneToMany(mappedBy = "school")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Teacher> teachers = new HashSet<>();

    @OneToMany(mappedBy = "school")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Room> rooms = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSchoolNam() {
        return schoolNam;
    }

    public School schoolNam(String schoolNam) {
        this.schoolNam = schoolNam;
        return this;
    }

    public void setSchoolNam(String schoolNam) {
        this.schoolNam = schoolNam;
    }

    public String getSchoolAddress() {
        return schoolAddress;
    }

    public School schoolAddress(String schoolAddress) {
        this.schoolAddress = schoolAddress;
        return this;
    }

    public void setSchoolAddress(String schoolAddress) {
        this.schoolAddress = schoolAddress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public School phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public School email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Active getIsActive() {
        return isActive;
    }

    public School isActive(Active isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Active isActive) {
        this.isActive = isActive;
    }

    public Set<Teacher> getTeachers() {
        return teachers;
    }

    public School teachers(Set<Teacher> teachers) {
        this.teachers = teachers;
        return this;
    }

    public School addTeacher(Teacher teacher) {
        this.teachers.add(teacher);
        teacher.setSchool(this);
        return this;
    }

    public School removeTeacher(Teacher teacher) {
        this.teachers.remove(teacher);
        teacher.setSchool(null);
        return this;
    }

    public void setTeachers(Set<Teacher> teachers) {
        this.teachers = teachers;
    }

    public Set<Room> getRooms() {
        return rooms;
    }

    public School rooms(Set<Room> rooms) {
        this.rooms = rooms;
        return this;
    }

    public School addRoom(Room room) {
        this.rooms.add(room);
        room.setSchool(this);
        return this;
    }

    public School removeRoom(Room room) {
        this.rooms.remove(room);
        room.setSchool(null);
        return this;
    }

    public void setRooms(Set<Room> rooms) {
        this.rooms = rooms;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        School school = (School) o;
        if (school.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), school.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "School{" +
            "id=" + getId() +
            ", schoolNam='" + getSchoolNam() + "'" +
            ", schoolAddress='" + getSchoolAddress() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", email='" + getEmail() + "'" +
            ", isActive='" + getIsActive() + "'" +
            "}";
    }
}
